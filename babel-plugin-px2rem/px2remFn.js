const template = require("@babel/template");
const { numericLiteral } = require("@babel/types");
const Config = require("./config");

const px2rem = `function %%px2rem%%(%%input%%, ...args) {
    if (typeof %%input%% === 'function') return %%px2rem%%(%%input%%(...args), ...args);
    var value = typeof %%input%% === 'string' ? parseFloat(%%input%%) : typeof %%input%% === 'number' ? %%input%% : 0;
    var pixels = (Number.isNaN(value) ? 0 : value);
    if (Math.abs(pixels) < %%minPixelValue%%) return pixels + 'px';
    var mul = Math.pow(10, %%unitPrecision%% + 1);
    return ((Math.round(Math.floor(((pixels  * %%multiplier%%) / %%rootValue%%) * mul) / 10) * 10) / mul) + 'rem';
}`;

const px2remFn = (_px2rem, config = Config.getConfig()) => {
  return template.statement(px2rem)({
    input: "input",
    px2rem: "_px2rem",
    minPixelValue: numericLiteral(config.minPixelValue),
    unitPrecision: numericLiteral(config.unitPrecision),
    multiplier: numericLiteral(config.multiplier),
    rootValue: numericLiteral(config.rootValue),
  });
};

module.exports = px2remFn;
