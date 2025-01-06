class Config {
  static defaultConfig = Object.freeze({
    // postcss-pxtorem config
    rootValue: 16,
    unitPrecision: 5,
    propList: ["*"],
    selectorBlackList: [],
    replace: true,
    mediaQuery: false,
    minPixelValue: 0,
    exclude: false,

    // our own config
    tags: ["styled", "css", "createGlobalStyle", "keyframes"],
    multiplier: 1,
    transformRuntime: false,
    transformJSX: false,
  });

  #config = Config.defaultConfig;

  getConfig() {
    return structuredClone(this.#config);
  }

  setConfig(config) {
    if (
      !config ||
      Object.prototype.toString.call(config) !== "[object Object]"
    ) {
      throw new TypeError("Config must be an object");
    }

    Object.keys(config).forEach((key) => {
      if (!Object.keys(this.#config).includes(key)) {
        throw new Error(`Unknown config option: ${key}`);
      }
    });

    this.#config = Object.assign({}, this.#config, config);

    return this.getConfig();
  }

  resetConfig() {
    this.#config = Config.defaultConfig;
  }
}

module.exports = new Config();
