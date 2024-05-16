module.exports = {
	roots: ['<rootDir>/client', '<rootDir>/tests/client'], // scans where jest should look for tests and modules
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/tests/client/.*|(\\.|/)(test|spec))\\.tsx?$',
	testPathIgnorePatterns: ['/node_modules/', '/client/setupTests.ts'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/client/tsconfig.json',
		},
	},
};
