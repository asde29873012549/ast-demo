const Config = require("./config");
const {
  isIdentifier,
  isMemberExpression,
  isCallExpression,
  isOptionalCallExpression,
  isBinaryExpression,
  isStringLiteral,
  isNumericLiteral,
  isLogicalExpression,
  isOptionalMemberExpression,
  isJSXElement,
  isArrowFunctionExpression,
  isFunctionDeclaration,
  isFunctionExpression,
  isBlockStatement,
} = require("@babel/types");
const { DISABLE_COMMENT_REGEX } = require("./constants");

// Handle cases like keyframes`...`
const isStyledIdentifier = (identifier) => {
  // options: styled, css, createGlobalStyle, keyframes
  const { tags } = Config.getConfig();
  return tags.includes(identifier.name);
};

// Handle cases like styled.div`...`
const isStyledMember = (member) => {
  if (isIdentifier(member.object)) {
    return isStyledIdentifier(member.object);
  }

  if (isMemberExpression(member.object)) {
    return isStyledMember(member.object);
  }

  return false;
};

// Handle cases like styled(Component)`...`
const isStyledFunction = (callExpression) => {
  const { callee } = callExpression.node || callExpression || {};
  if (isIdentifier(callee)) {
    return isStyledIdentifier(callee);
  }

  if (isMemberExpression(callee)) {
    return isStyledMember(callee);
  }

  if (isCallExpression(callee)) {
    return isStyledFunction(callee);
  }

  return false;
};

// General check for styled components
const isStyledTag = (taggedTemplateLiteral) => {
  const { tag } = taggedTemplateLiteral.node || taggedTemplateLiteral || {};

  if (!tag) {
    return false;
  }

  if (isIdentifier(tag)) {
    return isStyledIdentifier(tag);
  }

  if (isMemberExpression(tag)) {
    return isStyledMember(tag);
  }

  if (isCallExpression(tag)) {
    return isStyledFunction(tag);
  }

  return false;
};

const isPureExpression = (expression) => {
  return (
    // margin: ${size}px;
    isIdentifier(expression) ||
    // margin: ${getSize()}px;
    isCallExpression(expression) ||
    // margin: ${obj?.getSize?.()}px;
    isOptionalCallExpression(expression) ||
    // margin: ${100 + 2}px;
    isBinaryExpression(expression) ||
    // margin: ${'100px'};
    isStringLiteral(expression) ||
    // margin: ${100};
    isNumericLiteral(expression) ||
    // margin: ${obj.size}px;
    isMemberExpression(expression) ||
    // margin: ${obj?.size}px;
    isOptionalMemberExpression(expression) ||
    // margin: ${a && b}px;
    isLogicalExpression(expression)
  );
};

const getComponentName = (id) => {
  return id && isIdentifier(id) ? id.name : null;
};

const isReturnJSX = (blockStatementPath) => {
  let hasJSX = false;
  blockStatementPath.traverse({
    ReturnStatement(path) {
      const argument = path.get("argument");
      if (isJSXElement(argument)) {
        hasJSX = true;
      }
    },
  });
  return hasJSX;
};

const isReactComponent = (id, path) => {
  // early check for valid component name before expensive traversal
  const componentName = getComponentName(id);
  if (
    !componentName ||
    componentName[0] !== componentName[0].toUpperCase() ||
    !path?.node
  )
    return false;

  const bodyPath = path.get("body");

  // Arrow function component
  if (isArrowFunctionExpression(path.node)) {
    return (
      isJSXElement(bodyPath.node) ||
      (isBlockStatement(bodyPath.node) && isReturnJSX(bodyPath))
    );
  }

  // Regular function component
  if (isFunctionDeclaration(path.node) || isFunctionExpression(path.node)) {
    return isReturnJSX(bodyPath);
  }

  return false;
};

const isFileDisabledByComment = (programPath) => {
  const comments = programPath.node?.body[0]?.leadingComments || [];
  const isCommentBlock = (node) => node.type === "CommentBlock";
  return comments.some(
    (comment) =>
      isCommentBlock(comment) && DISABLE_COMMENT_REGEX.test(comment.value),
  );
};

module.exports = {
  isStyledTag,
  isStyledFunction,
  isPureExpression,
  isReturnJSX,
  isReactComponent,
  isFileDisabledByComment,
};
