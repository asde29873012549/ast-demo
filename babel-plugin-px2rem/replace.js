const postcss = require("postcss");
const px2rem = require("postcss-pxtorem");
const scss = require("postcss-scss");
const Config = require("./config");
const {
  CSS_OPENING_PLACEHOLDER,
  CSS_CLOSING_PLACEHOLDER,
  CSS_PROPERTY_PLACEHOLDER,
  CSS_PAIR_REGEX,
  PX_REGEX,
} = require("./constants");

const process = (cssContent) => {
  const {
    tags,
    multiplier,
    transformRuntime,
    transformJSX,
    rootValue,
    ...others
  } = Config.getConfig();
  // use scss syntax to ensure the scss-like syntax in styled-components can be processed
  return postcss([
    px2rem({ ...others, rootValue: rootValue / multiplier }),
  ]).process(cssContent, { syntax: scss }).css;
};

const replacePxToRemInCss = (cssContent, retry = 1) => {
  try {
    // handle cases like padding: 10px 20px;
    if (CSS_PAIR_REGEX.test(cssContent)) {
      return process(
        `${CSS_OPENING_PLACEHOLDER}${cssContent}${CSS_CLOSING_PLACEHOLDER}`,
      )
        .replace(CSS_OPENING_PLACEHOLDER, "")
        .replace(CSS_CLOSING_PLACEHOLDER, "");
      // handle cases like transform: translateX(10px);
    } else if (PX_REGEX.test(cssContent)) {
      return process(`${CSS_PROPERTY_PLACEHOLDER}${cssContent}`).replace(
        CSS_PROPERTY_PLACEHOLDER,
        "",
      );
    } else {
      return cssContent;
    }
  } catch (error) {
    // retry with split and join
    if (retry > 0) {
      return cssContent.split(";").map((css) => replacePxToRemInCss(css, retry - 1)).join(";");
    }
    return cssContent;
  }
};

module.exports = replacePxToRemInCss;
