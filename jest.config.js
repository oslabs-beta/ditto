module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['/tests/**/*.[jt]s?(x)'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
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
			testMatch: ['tests/server/**/*.[jt]s?(x)'],
			globals: {
				'ts-jest': {
					tsconfig: '/server/tsconfig.json',
				},
			},
		},
	],
};
