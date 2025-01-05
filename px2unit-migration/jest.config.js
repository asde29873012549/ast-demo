module.exports = {
  setupFilesAfterEnv: ["./scripts/rmPx2Unit/__tests__/setup.js"],
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/fixtures/"],
  transform: {},
};
