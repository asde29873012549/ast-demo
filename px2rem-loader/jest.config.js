module.exports = {
  setupFilesAfterEnv: ["./__tests__/setup.js"],
  testEnvironment: "node",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ["**/__tests__/**/*.test.js"],
  testPathIgnorePatterns: ["/node_modules/", "/fixtures/"],
};
