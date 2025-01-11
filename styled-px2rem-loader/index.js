const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const Config = require("./config");
const {
  isStyledTag,
  isStyledFunction,
  isReactComponent,
  isFileDisabledByComment,
} = require("./utils");
const px2remFn = require("./px2remFn");
const { createTemplateVisitor } = require("./visitors/templateVisitor");
const ExpressionTransformer = require("./transforms/expressionTransformer");
const RuntimeTransformer = require("./transforms/runtimeTransformer");

module.exports = function (source) {
  // Webpack loader context
  const callback = this.async();
  const options = this.getOptions();
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
        // If the whole file is disabled by comment, skip the transformation
        if (isFileDisabledByComment(programPath)) return;

        const px2remId = config.transformRuntime
          ? programPath.scope.generateUidIdentifier("px2rem")
          : undefined;

        expressionTransformer = new ExpressionTransformer(px2remId);
        runtimeTransformer = new RuntimeTransformer(expressionTransformer);

        const templateVisitor = createTemplateVisitor(config, (path) =>
          runtimeTransformer.transform(path),
        );

        programPath.traverse({
          // styled-components transform
          TaggedTemplateExpression(taggedTemplatePath) {
            if (!isStyledTag(taggedTemplatePath)) return;
            taggedTemplatePath.traverse(templateVisitor);
          },

          CallExpression(callExpressionPath) {
            if (!isStyledFunction(callExpressionPath)) return;
            callExpressionPath.traverse(templateVisitor);
          },

          // React component transform
          ...(config.transformJSX
            ? {
                VariableDeclaration(variableDeclarationPath) {
                  const [declarationPath] =
                    variableDeclarationPath.get("declarations");
                  const initPath = declarationPath.get("init");
                  const { id } = declarationPath.node;
                  if (!isReactComponent(id, initPath)) return;
                  initPath.traverse(templateVisitor);
                },

                FunctionDeclaration(functionDeclarationPath) {
                  const { id } = functionDeclarationPath.node;
                  if (!isReactComponent(id, functionDeclarationPath)) return;
                  functionDeclarationPath.traverse(templateVisitor);
                },
              }
            : {}),
        });
      },
    },
  };

  try {
    // Parse the source code
    const ast = parser.parse(source, {
      sourceType: "module",
      plugins: ["jsx"],
    });

    // Reuse your existing visitors and transforms
    traverse(ast, visitor);

    // Generate code
    const output = generate(ast, {}, source);

    callback(null, output.code, output.map);
  } catch (err) {
    callback(err);
  }
};
