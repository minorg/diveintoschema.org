import type {Config} from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  //   coverageProvider: "v8",
  moduleNameMapper: {
    "^@/lib/(.*)$": "<rootDir>/lib/$1",
  },
  testEnvironment: "node",
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// https://stackoverflow.com/questions/70916761/next-js-and-jest-syntaxerror-cannot-use-import-statement-outside-a-module
module.exports = async () => ({
  ...(await createJestConfig(customJestConfig)()),
  transformIgnorePatterns: [
    "node_modules/(?!(cacheable-lookup|cacheable-request|get-stream|got|lowercase-keys|mimic-response|p-cancelable|normalize-url|responselike|@sindresorhus/is|@szmarczak/http-timer)/)",
  ],
});
