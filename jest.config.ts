
export default {
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  verbose: true,
  transform: { '^.+\\.js$': '<rootDir>/jestPreprocess.ts' },
  coverageDirectory: "coverage",
  preset: 'ts-jest/presets/js-with-ts',
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  globals: { fetch, Response, Request }
};
