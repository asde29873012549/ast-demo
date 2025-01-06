const {
  isIdentifier,
  isMemberExpression,
  isCallExpression,
  isOptionalCallExpression,
  isBinaryExpression,
  isStringLiteral,
  isNumericLiteral,
  isUnaryExpression,
  isOptionalMemberExpression,
  isLogicalExpression,
  templateLiteral,
  templateElement,
  stringLiteral,
} = require("@babel/types");

const { STYLED_TAGS, VALID_UNARY_OPERATORS } = require("../constants.js");

// Handle cases like keyframes`...`
// options: styled, css, createGlobalStyle, keyframes
const isStyledIdentifier = (identifier) =>
  STYLED_TAGS.includes(identifier.name);

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

const isPureExpression = (expression) =>
  // margin: ${size}px
  isIdentifier(expression) ||
  // margin: ${getSize()}px
  isCallExpression(expression) ||
  // margin: ${obj?.getSize?.()}px
  isOptionalCallExpression(expression) ||
  // margin: ${100 + 2}px
  isBinaryExpression(expression) ||
  // margin: ${obj.size}px
  isMemberExpression(expression) ||
  // margin: ${obj?.size}px
  isOptionalMemberExpression(expression) ||
  // margin: ${a && b}px
  isLogicalExpression(expression);

const isPureLiteral = (expression) => {
  if (
    isUnaryExpression(expression) &&
    VALID_UNARY_OPERATORS.includes(expression.operator)
  ) {
    return isNumericLiteral(expression.argument);
  }

  return isNumericLiteral(expression) || isStringLiteral(expression);
};

const isPx2UnitCall = (expression) => expression.callee?.name === "px2Unit";

const createTemplateLiteral = (expression) =>
  templateLiteral(
    [
      templateElement({ raw: "", cooked: "" }, false),
      templateElement({ raw: "px", cooked: "px" }, true),
    ],
    [expression],
  );

const getPx2UnitReplacementNode = (arg) => {
  if (arg === undefined || arg === null) {
    return stringLiteral("0px");
  }

  if (isNumericLiteral(arg)) {
    return stringLiteral(`${arg.value}px`);
  }

  if (isUnaryExpression(arg)) {
    return stringLiteral(`${arg.operator}${arg.argument.value}px`);
  }

  return createTemplateLiteral(arg);
};


module.exports = {
  isStyledTag,
  isStyledFunction,
  isPureExpression,
  isPureLiteral,
  isPx2UnitCall,
  createTemplateLiteral,
  getPx2UnitReplacementNode
};