const { declare } = require('@babel/helper-plugin-utils');
const Config = require('./config');
const { isStyledTag } = require('./utils');
const px2remFn = require('./px2remFn');
const createTemplateVisitor = require('./visitors/templateVisitor');
const ExpressionTransformer = require('./transforms/expressionTransformer');
const RuntimeTransformer = require('./transforms/runtimeTransformer');

module.exports = declare((api, options) => {
  api.assertVersion(7);
  const config = Config.setConfig(options);
  let expressionTransformer;
  let runtimeTransformer;

  const visitor = {
    Program: {
      exit(programPath) {
        const { px2remFnUsed, px2rem } = expressionTransformer || {};
        if (px2remFnUsed && px2rem) {
          programPath.node.body.push(px2remFn(px2rem, config));
        }
      },
      enter(programPath) {
        const px2remId = config.transformRuntime 
          ? programPath.scope.generateUidIdentifier('px2rem')
          : undefined;

        expressionTransformer = new ExpressionTransformer(px2remId);
        runtimeTransformer = new RuntimeTransformer(expressionTransformer);

        const templateVisitor = createTemplateVisitor(
          config, 
          (path) => runtimeTransformer.transform(path)
        );

        programPath.traverse({
          TaggedTemplateExpression(taggedTemplatePath) {
            if (!isStyledTag(taggedTemplatePath)) return;
            taggedTemplatePath.traverse(templateVisitor);
          },

          CallExpression(callExpressionPath) {
            if (!isStyledTag(callExpressionPath)) return;
            callExpressionPath.traverse(templateVisitor);
          },

          JSXAttribute(jsxAttributePath) {
            if (!config.transformJSXAttribute) return;
            jsxAttributePath.traverse(templateVisitor);
          }
        });
      }
    }
  };

  return {
    name: 'styled-components-px2rem',
    visitor,
  };
});