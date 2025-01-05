const DEFAULT_INCLUDE_PATHS = ["Page"];
const AVAILABLE_EXTENSIONS = [".js", ".jsx", ".ts", ".tsx"];
const STYLED_TAGS = ["styled", "css", "createGlobalStyle", "keyframes"];
const VALID_UNARY_OPERATORS = ["-", "+", "*", "/"];

const COMMAND_LINE_ARGS = {
  DRY_RUN: "--dry",
  INCLUDE_PATHS: "--include",
};

const ANSI_PALETTE = {
  YELLOW: "\x1b[33m",
  GREEN: "\x1b[32m",
  RED: "\x1b[31m",
  RESET: "\x1b[0m",
};

module.exports = {
  DEFAULT_INCLUDE_PATHS,
  AVAILABLE_EXTENSIONS,
  STYLED_TAGS,
  VALID_UNARY_OPERATORS,
  COMMAND_LINE_ARGS,
  ANSI_PALETTE,
};
