module.exports = {
  collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '~/(.*)': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/public/',
    '<rootDir>/webpack/',
    '/node_modules/'
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/coverage/',
    '<rootDir>/dist/',
    '<rootDir>/public/',
    '<rootDir>/webpack/',
    '/node_modules/'
  ]
}
