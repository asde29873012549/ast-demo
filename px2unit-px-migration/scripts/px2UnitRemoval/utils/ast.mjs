import {
  isIdentifier,
  isMemberExpression,
  isCallExpression,
  isOptionalCallExpression,
  isBinaryExpression,
  isStringLiteral,
  isNumericLiteral,
  isOptionalMemberExpression,
  isLogicalExpression,
  templateLiteral,
  templateElement,
} from "@babel/types";

import { STYLED_TAGS } from "../constants.mjs";

// Handle cases like keyframes`...`
const isStyledIdentifier = (identifier) => {
  // options: styled, css, createGlobalStyle, keyframes
  return STYLED_TAGS.includes(identifier.name);
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
  const { callee } = callExpression;
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
export const isStyledTag = (taggedTemplateLiteral) => {
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

export const isPureExpression = (expression) => {
  return (
    // margin: ${size}px;
    isIdentifier(expression) ||
    // margin: ${getSize()}px;
    isCallExpression(expression) ||
    // margin: ${obj?.getSize?.()}px;
    isOptionalCallExpression(expression) ||
    // margin: ${100 + 2}px;
    isBinaryExpression(expression) ||
    // margin: ${obj.size}px;
    isMemberExpression(expression) ||
    // margin: ${obj?.size}px;
    isOptionalMemberExpression(expression) ||
    // margin: ${a && b}px;
    isLogicalExpression(expression)
  );
};

export const isPureLiteral = (expression) => {
  return isNumericLiteral(expression) || isStringLiteral(expression);
};

export const isPx2UnitCall = (expression) =>
  expression.callee?.name === "px2Unit";

export const createTemplateLiteral = (expression) =>
  templateLiteral(
    [
      templateElement({ raw: "", cooked: "" }, false),
      templateElement({ raw: "px", cooked: "px" }, true),
    ],
    [expression],
  );
