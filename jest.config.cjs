module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  transformIgnorePatterns: [
    '/node_modules/',
    '/databases/'
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  
};
