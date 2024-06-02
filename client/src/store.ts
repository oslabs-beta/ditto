import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const SET_USER = 'SET_USER';
const SET_PROJECTS = 'SET_PROJECTS';
const SET_DATABASES = 'SET_DATABASES';
const SET_MIGRATION_VERSIONS = 'SET_MIGRATION_VERSIONS';
const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECTS';
const SET_SELECTED_DATABASE = 'SET_SELECTED_DATABASE';
const SET_SELECTED_MIGRATION = 'SET_SELECTED_MIGRATION';
const SET_SELECTED_TABLE = 'SET_SELECTED_TABLE';
const SET_SHOW_INPUT = 'SET_SHOW_INPUT';
const SET_DB_NAME = 'SET_DB_NAME';
const SET_CONNECTION_STRING = 'SET_CONNECTION_STRING';
const SET_TOKEN = 'SET_TOKEN';
const SET_DB_ID = 'SET_DB_ID';
const SET_PROJECT_ID = 'SET_PROJECT_ID';
const SET_DESCRIPTION = 'SET_DESCRIPTION';
const SET_SELECTED_ACTION = 'SET_SELECTED_ACTION';
const SET_SELECTED_SCRIPT = 'SET_SELECTED_SCRIPT';
const SET_SCRIPT = 'SET_SCRIPT';
const RESET_STATE = 'RESET_STATE';
const SET_USER_ROLE = 'SET_USER_ROLE';

export const setUser = (user: string) => ({ type: SET_USER, payload: user });

export const setProjects = (
	projects: { projects_name: string; projects_id: string }[]
) => ({
	type: SET_PROJECTS,
	payload: projects,
});

export const setDatabases = (
	databases: { connection_string: string; db_name: string; db_id: string }[]
) => ({
	type: SET_DATABASES,
	payload: databases,
});

export const setMigrationVersions = (databases: string[]) => ({
	type: SET_MIGRATION_VERSIONS,
	payload: databases,
});

export const setdbId = (dbId: string | undefined) => ({
	type: SET_DB_ID,
	payload: dbId,
});

export const setProjectId = (projectId: string | undefined) => ({
	type: SET_PROJECT_ID,
	payload: projectId,
});

export const setSelectedTable = (table: string) => ({
	type: SET_SELECTED_TABLE,
	payload: table,
});
export const setSelectedDatabase = (database: string) => ({
	type: SET_SELECTED_DATABASE,
	payload: database,
});
export const setSelectedMigration = (migration: string) => ({
	type: SET_SELECTED_MIGRATION,
	payload: migration,
});

export const setSelectedProject = (projects: string) => ({
	type: SET_SELECTED_PROJECT,
	payload: projects,
});

export const setShowInput = (show: boolean) => ({
	type: SET_SHOW_INPUT,
	payload: show,
});
export const setDbName = (dbName: string) => ({
	type: SET_DB_NAME,
	payload: dbName,
});

export const setConnectionString = (connectionString: string) => ({
	type: SET_CONNECTION_STRING,
	payload: connectionString,
});

export const setToken = (token: string) => ({
	type: SET_TOKEN,
	payload: token,
});

export const setDescription = (description: string) => ({
	type: SET_DESCRIPTION,
	payload: description,
});

export const setSelectedAction = (selectedAction: string) => ({
	type: SET_SELECTED_ACTION,
	payload: selectedAction,
});

export const setSelectedScript = (selectedScript: string) => ({
	type: SET_SELECTED_SCRIPT,
	payload: selectedScript,
});

export const setScript = (script: string) => ({
	type: SET_SCRIPT,
	payload: script,
});

export const resetState = () => ({
	type: RESET_STATE,
});

export const setUserRole = (role: string) => ({
	type: SET_USER_ROLE,
	payload: role,
});

const initialState = {
	user: '',
	token: '',
	databases: [],
	projects: [
		{ project_id: '24', project_name: 'ShellScapePlanner' },
		{ project_id: '11', project_name: 'DateNight' },
		{ project_id: '67', project_name: 'Solibee' },
	],
	migrationVersions: [],
	selectedTable: '',
	selectedDatabase: '',
	selectedMigration: '',
	selectedProject: 'ShellScapePlanner',
	showInput: false,
	dbName: '',
	connectionString: '',
	dbId: '',
	description: '',
	selectedAction: 'Migrate',
	selectedScript: '',
	userRole: 'admin',
};

const rootReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case SET_TOKEN:
			return { ...state, token: action.payload };
		case SET_PROJECTS:
			return { ...state, projects: action.payload };
		case SET_DATABASES:
			return { ...state, databases: action.payload };
		case SET_MIGRATION_VERSIONS:
			return { ...state, migrationVersions: action.payload };
		case SET_SELECTED_TABLE:
			return { ...state, selectedTable: action.payload };
		case SET_SELECTED_DATABASE:
			return { ...state, selectedDatabase: action.payload };
		case SET_SELECTED_MIGRATION:
			return { ...state, selectedMigration: action.payload };
		case SET_SELECTED_PROJECT:
			return { ...state, selectedProject: action.payload };
		case SET_SHOW_INPUT:
			return { ...state, showInput: action.payload };
		case SET_DB_NAME:
			return { ...state, dbName: action.payload };
		case SET_CONNECTION_STRING:
			return { ...state, connectionString: action.payload };
		case SET_DB_ID:
			return { ...state, dbId: action.payload };
		case SET_DESCRIPTION:
			return { ...state, description: action.payload };
		case SET_SELECTED_ACTION:
			return { ...state, selectedAction: action.payload };
		case SET_SELECTED_SCRIPT:
			return { ...state, selectedScript: action.payload };
		case SET_SCRIPT:
			return { ...state, script: action.payload };
		case SET_USER_ROLE:
			return { ...state, userRole: action.payload };
		case RESET_STATE:
			console.log('in reset state', initialState);
			return initialState;
		default:
			return state;
	}
};

const store = configureStore({
	reducer: rootReducer,
});

export default store;
