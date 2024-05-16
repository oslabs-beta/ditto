module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['<rootDir>/tests/**/*.[jt]s?(x)'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest'
	},
	projects: [
		{
			displayName: 'client',
			testMatch: ['/tests/client/**/*.[jt]s?(x)'],
			globals: {
				'ts-jest': {
					tsconfig: '/client/tsconfig.json',
				},
			},
		},
		{
			displayName: 'server',
			testMatch: ['<rootDir>/tests/backend/**/*.[jt]s?(x)'],
			globals: {
				'ts-jest': {
					tsconfig: '<rootDir>/server/tsconfig.json',
				},
			},
		},
	],
};
