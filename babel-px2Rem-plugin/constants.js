const CSS_OPENING_PLACEHOLDER = "/* px2rem opening placeholder */ {";
const CSS_CLOSING_PLACEHOLDER = "} /* px2rem closing placeholder */";
const CSS_PROPERTY_PLACEHOLDER =
  "/* start: px2rem property placeholder */ padding: /* end: px2rem property placeholder */";

const CSS_PAIR_REGEX = /[\s\w-]+:([\s-\d]+px)+/;
const PX_REGEX = /(?<![\w-])(-)?(\d*\.?\d+)px\b/;

module.exports = {
  CSS_OPENING_PLACEHOLDER,
  CSS_CLOSING_PLACEHOLDER,
  CSS_PROPERTY_PLACEHOLDER,
  CSS_PAIR_REGEX,
  PX_REGEX,
};
