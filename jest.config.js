// module.exports = {
// 	roots: ['<rootDir>/client', '<rootDir>/tests/client', '<rootDir>/tests/backend'], 
// 	transform: {
// 		'^.+\\.tsx?$': 'ts-jest', 
// 	},
// 	testEnvironment: 'node', 
// 	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
// 	setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'], 
// 	projects: [
// 		{
// 			displayName: 'client',
// 			testEnvironment: 'jsdom', 
// 			testMatch: ['<rootDir>/tests/client/**/*.[jt]s?(x)'], 
// 			globals: {
// 				'ts-jest': {
// 					tsconfig: '<rootDir>/client/tsconfig.json', 
// 				},
// 			},
// 			testPathIgnorePatterns: ['/node_modules/', '/client/setupTests.ts'],
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
// };
