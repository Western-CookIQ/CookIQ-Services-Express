/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

// to access env variables, add more paths if required
require("dotenv").config();

/** @type {import('jest').Config} */
const config = {
  rootDir: "./",

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: "<rootDir>/coverage",

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],

  // An array of regexp pattern strings that are matched against all test file paths
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.js$",
};

module.exports = config;
