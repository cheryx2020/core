export default {
  // Other Jest configurations...
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.(css|scss)$': 'jest-css-modules-transform',
  },
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.js"]
};
