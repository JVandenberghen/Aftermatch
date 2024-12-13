const config = {
  preset: "vite-jest",
  collectCoverage: false,
  coverageReporters: ["text"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
};

export default config;
