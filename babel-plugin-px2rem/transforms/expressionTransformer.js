const {
  isConditionalExpression,
  isBlockStatement,
  isArrowFunctionExpression,
  isFunctionExpression,
  callExpression,
  arrowFunctionExpression,
  restElement,
  spreadElement,
  identifier,
} = require("@babel/types");

const { isPureExpression } = require("../utils");

class ExpressionTransformer {
  constructor(px2rem) {
    this.px2rem = px2rem;
    this.px2remFnUsed = false;
  }

  createPx2RemCall(...args) {
    this.px2remFnUsed = true;
    return callExpression(this.px2rem, args);
  }

  handleArrowFunction(expression) {
    const { body } = expression;

    if (isBlockStatement(body)) {
      expression.body = this.createPx2RemCall(
        arrowFunctionExpression([], body),
      );
      return expression;
    }

    if (isPureExpression(body)) {
      expression.body = this.createPx2RemCall(body);
      return expression;
    }

    expression.body = this.insertPx2RemCall(body);
    return expression;
  }

  wrapFunctionWithPx2Rem(expression) {
    return arrowFunctionExpression(
      [restElement(identifier("args"))],
      this.createPx2RemCall(expression, spreadElement(identifier("args"))),
    );
  }

  insertPx2RemCall(expression) {
    if (isArrowFunctionExpression(expression)) {
      return this.handleArrowFunction(expression);
    }

    if (isConditionalExpression(expression)) {
      expression.alternate = this.insertPx2RemCall(expression.alternate);
      expression.consequent = this.insertPx2RemCall(expression.consequent);
      return expression;
    }

    if (isFunctionExpression(expression)) {
      return this.wrapFunctionWithPx2Rem(expression);
    }

    return this.createPx2RemCall(expression);
  }
}

module.exports = ExpressionTransformer;
