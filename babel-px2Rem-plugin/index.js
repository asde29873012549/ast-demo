const { declare } = require('@babel/helper-plugin-utils');
const {
  isTemplateElement,
  isConditionalExpression,
  isBlockStatement,
  isArrowFunctionExpression,
  isFunctionExpression,
  callExpression,
  arrowFunctionExpression,
  restElement,
  spreadElement,
  identifier,
} = require('@babel/types');

const Config = require('./config');
const { isStyledTag, isPureExpression } = require('./utils');
const px2remFn = require('./px2remFn');
const replacePxToRemInCss = require('./replace');

let _px2rem;
let _px2remFnUsed = false;

const createPx2RemCall = (px2rem, ...args) => {
  _px2remFnUsed = true;
  return callExpression(px2rem, args)
}

const handleArrowFunction = (expression, px2rem) => {
  const { body } = expression;

  if (isBlockStatement(body)) {
    // example
    // margin: ${props => {
    //   if (props.large) {
    //     return '20px';
    //   }
    //   return '10px';
    // }};
    expression.body = createPx2RemCall(px2rem, arrowFunctionExpression([], body));
    return expression;
  }
  
  if (isPureExpression(body)) {
    expression.body = createPx2RemCall(px2rem, body);
    return expression;
  }
  
  expression.body = insertPx2RemCall(body, px2rem);
  return expression;
}

const wrapFunctionWithPx2Rem = (expression, px2rem) => {
  return arrowFunctionExpression(
    [restElement(identifier('args'))],
    createPx2RemCall(px2rem, expression, spreadElement(identifier('args')))
  );
}

const insertPx2RemCall = (expression, px2rem) => {
  // Case 1: Arrow Function Expression
  if (isArrowFunctionExpression(expression)) {
    return handleArrowFunction(expression, px2rem);
  }

  // Case 2: Conditional Expression (ternary)
  if (isConditionalExpression(expression)) {
    expression.alternate = insertPx2RemCall(expression.alternate, px2rem);
    expression.consequent = insertPx2RemCall(expression.consequent, px2rem);
    return expression;
  }

  // Case 3: Regular Function Expression
  if (isFunctionExpression(expression)) {
    // Before
    // margin: ${function(props) {
    //   return props.size + 'px';
    // }};

    // After
    // margin: ${(...args) => _px2rem(function(props) {
    //   return props.size + 'px';
    // }, ...args)};
    return wrapFunctionWithPx2Rem(expression, px2rem);
  }

  // Case 4: Simple expressions (default case)
  return createPx2RemCall(px2rem, expression);
}

const transformRuntime = (templateLiteralPath) => {
  if (!_px2rem) return;

  const { quasis, expressions } = templateLiteralPath.node;
  const mergedExpressions = [...quasis, ...expressions].sort((a, b) => a.start - b.start);

  mergedExpressions.forEach((expression, index) => {
    if (isTemplateElement(expression)) return;

    const nextExpression = mergedExpressions[index + 1];
    // check if the current expression is followed by a template element and starts with px
    // This means the current expression is a px value in styled-components eg: width: ${currentWidth}px
    if (nextExpression && isTemplateElement(nextExpression) && /^px/.test(nextExpression.value?.raw)) {
      
      const originalExpressionIndex = expressions.findIndex(e => e === expression);
      if (originalExpressionIndex === -1) return;

      templateLiteralPath.node.expressions[originalExpressionIndex] = insertPx2RemCall(expression, _px2rem)

      if (!nextExpression?.value?.raw || !nextExpression?.value?.cooked) return;

      // remove the px prefix of the next expression
      nextExpression.value.raw = nextExpression.value.raw.replace(/^px/, '');
      nextExpression.value.cooked = nextExpression.value.cooked.replace(/^px/, '');
    }

  });
}

module.exports = declare((api, options) => {
  api.assertVersion(7);

  // Set the config. for user options
  Config.setConfig(options);
  const config = Config.getConfig();

  const templateVisitor = {
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

    ...(config.transformRuntime ? {
      TemplateLiteral(templateLiteralPath) {
        transformRuntime(templateLiteralPath);
      }
    } : {})
  }

  const visitor = {
    Program: {
        exit(programPath) {
          // make sure if px2rem function is used, we add it to the program
          if (_px2remFnUsed && _px2rem) {
            programPath.node.body.push(px2remFn(_px2rem, config));
          }
        },
        enter(programPath) {
          if (!config.transformRuntime) {
            // if not needed to transform pxs in expressions at runtime, we set _px2rem to undefined
            _px2rem = undefined;
          } else {
            // create a unique identifier for the px2rem function to avoid conflicts
            _px2rem = programPath.scope.generateUidIdentifier('px2rem');
          }

          // reset the flag
          _px2remFnUsed = false;

          programPath.traverse({
            // Handle normal tagged template literals of styled-components eg: styled.div`...`
            TaggedTemplateExpression(taggedTemplatePath) {
              if (!isStyledTag(taggedTemplatePath)) return;
              taggedTemplatePath.traverse(templateVisitor);
            },

            // Handle CallExpression form of styled-components eg: styled.div(`...`)
            CallExpression(callExpressionPath) {
              if (!isStyledTag(callExpressionPath)) return;
              callExpressionPath.traverse(templateVisitor);
            },

            // Handle JSXAttribute form of styled-components eg: <div styled={{ padding: '10px' }} />
            JSXAttribute(jsxAttributePath) {
              if (!config.transformJSXAttribute) return;
              jsxAttributePath.traverse(templateVisitor);
            }
          })
        }
    }
  }

  return {
    name: 'styled-components-px2rem',
    visitor,
  }
});