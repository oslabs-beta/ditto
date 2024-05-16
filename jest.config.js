module.exports = {
	roots: ['<rootDir>/client', '<rootDir>/tests/client'], // scans where jest should look for tests and modules
	testEnvironment: 'jsdom', // specifies testenvironment (web specifically browser)
	transform: {
		'^.+\\.tsx?$': 'ts-jest', // gives all files that end in ts/tsx typescript support
	},
	testRegex: '(/tests/client/.*|(\\.|/)(test|spec))\\.tsx?$', // specifies which files are tests
	testPathIgnorePatterns: ['/node_modules/', '/client/setupTests.ts'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/client/tsconfig.json',
		},
	},
};
