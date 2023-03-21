module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts)$': 'ts-jest',
    '^.+\\.(css|scss)$': '<rootDir>/src/__mocks__/style-mock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.js'], // Add the setup file
  setupFiles: ['<rootDir>/jest/set-env-vars.js'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '\\.module\\.scss$': '<rootDir>/src/__mocks__/style-mock.ts',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@lib/(.*)': '<rootDir>/src/lib/$1',
    '@pages/(.*)': '<rootDir>/src/pages/$1',
    '@services/(.*)': '<rootDir>/src/services/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/jest/tsconfig.jest.json',
    },
  },
};
