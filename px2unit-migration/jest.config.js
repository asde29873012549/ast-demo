module.exports = {
  setupFilesAfterEnv: ["./scripts/rm-px2Unit/__tests__/setup.mjs"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js", "**/__tests__/**/*.test.mjs"],
  testPathIgnorePatterns: ["/node_modules/", "/fixtures/"],
  transform: {}
};