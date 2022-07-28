module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@view(.*)$': '<rootDir>/src/components/view$1',
  },
};
