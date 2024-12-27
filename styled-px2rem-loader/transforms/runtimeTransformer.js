const { isTemplateElement } = require("@babel/types");

class RuntimeTransformer {
  constructor(expressionTransformer) {
    this.expressionTransformer = expressionTransformer;
  }

  transform(templateLiteralPath) {
    if (!this.expressionTransformer.px2rem) return;

    const { quasis, expressions } = templateLiteralPath.node;
    const mergedExpressions = [...quasis, ...expressions].sort(
      (a, b) => a.start - b.start,
    );

    mergedExpressions.forEach((expression, index) => {
      if (isTemplateElement(expression)) return;

      const nextExpression = mergedExpressions[index + 1];
      if (
        nextExpression &&
        isTemplateElement(nextExpression) &&
        /^px/.test(nextExpression.value?.raw)
      ) {
        const originalExpressionIndex = expressions.findIndex(
          (e) => e === expression,
        );
        if (originalExpressionIndex === -1) return;

        templateLiteralPath.node.expressions[originalExpressionIndex] =
          this.expressionTransformer.insertPx2RemCall(expression);

        if (!nextExpression?.value?.raw || !nextExpression?.value?.cooked)
          return;

        nextExpression.value.raw = nextExpression.value.raw.replace(/^px/, "");
        nextExpression.value.cooked = nextExpression.value.cooked.replace(
          /^px/,
          "",
        );
      }
    });
  }
}

module.exports = RuntimeTransformer;
