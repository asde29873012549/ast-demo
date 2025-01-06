const replacePxToRemInCss = require("../replace");

const createTemplateVisitor = (config, transformRuntime) => ({
  TemplateElement(templateElementPath) {
    const { value } = templateElementPath.node || {};
    const { raw, cooked } = value || {};
    if (!raw || !cooked) return;

    value.raw = replacePxToRemInCss(raw);
    value.cooked = replacePxToRemInCss(cooked);
  },

  StringLiteral(stringLiteralPath) {
    const { value } = stringLiteralPath.node || {};
    if (!value) return;

    stringLiteralPath.node.value = replacePxToRemInCss(value);
  },

  ...(config.transformRuntime
    ? {
        TemplateLiteral(templateLiteralPath) {
          transformRuntime(templateLiteralPath);
        },
      }
    : {}),
});

module.exports = { createTemplateVisitor };
