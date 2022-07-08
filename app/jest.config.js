module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    globalSetup: './src/tests/globalSetup.ts',
    globalTeardown: './src/tests/globalTeardown.ts',
    clearMocks: true,
};
