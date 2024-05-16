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
	// 	preset: 'ts-jest',
	// 	testEnvironment: 'node',
	// 	testMatch: ['<rootDir>/tests/**/*.[jt]s?(x)'],
	// 	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	// 	transform: {
	// 		'^.+\\.tsx?$': 'ts-jest'
	// 	},
	// 	projects: [
	// 		{
	// 			displayName: 'client',
	// 			testMatch: ['/tests/client/**/*.[jt]s?(x)'],
	// 			globals: {
	// 				'ts-jest': {
	// 					tsconfig: '/client/tsconfig.json',
	// 				},
	// 			},
	// 		},
	// 		{
	// 			displayName: 'server',
	// 			testMatch: ['<rootDir>/tests/backend/**/*.[jt]s?(x)'],
	// 			globals: {
	// 				'ts-jest': {
	// 					tsconfig: '<rootDir>/server/tsconfig.json',
	// 				},
	// 			},
	// 		},
	// 	],
};
