const CSS_OPENING_PLACEHOLDER = "/* px2rem opening placeholder */ {";
const CSS_CLOSING_PLACEHOLDER = "} /* px2rem closing placeholder */";
const CSS_PROPERTY_PLACEHOLDER =
  "/* start: px2rem property placeholder */ padding: /* end: px2rem property placeholder */";

const CSS_PAIR_REGEX = /[\s\w-]+:\s*(-?\d*\.?\d+)px/;
const PX_REGEX = /(?<![\w-])(-?\d*\.?\d+\s*px)\b/;
const PX_REGEX_GLOBAL = /(?<![\w-])(-?\d*\.?\d+\s*px)\b/g;

const DISABLE_COMMENT_REGEX = /\s*styled-px2rem-disable\s*/;

module.exports = {
  CSS_OPENING_PLACEHOLDER,
  CSS_CLOSING_PLACEHOLDER,
  CSS_PROPERTY_PLACEHOLDER,
  CSS_PAIR_REGEX,
  PX_REGEX,
  PX_REGEX_GLOBAL,
  DISABLE_COMMENT_REGEX,
};
