// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

// Define action types
const SET_USER = 'SET_USER';
const SET_DATABASES = 'SET_DATABASES';
const SET_MIGRATION_VERSIONS = 'SET_MIGRATION_VERSIONS';
const SET_SELECTED_TABLE = 'SET_SELECTED_TABLE';
const SET_SELECTED_DATABASE = 'SET_SELECTED_DATABASE';
const SET_SELECTED_MIGRATION = 'SET_SELECTED_MIGRATION';
const SET_SHOW_INPUT = 'SET_SHOW_INPUT';
const SET_DB_NAME = 'SET_DB_NAME';
const SET_CONNECTION_STRING = 'SET_CONNECTION_STRING';
const SET_TOKEN = 'SET_TOKEN'; // test
const SET_DB_ID = 'SET_DB_ID';

// Define action creators
export const setUser = (user: string) => ({ type: SET_USER, payload: user });
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

//test
export const setToken = (token: string) => ({
	type: SET_TOKEN,
	payload: token,
});

// Define initial state
const initialState = {
	user: '',
	token: '',
	databases: [],
	migrationVersions: [],
	selectedTable: '',
	selectedDatabase: '',
	selectedMigration: '',
	showInput: false,
	dbName: '',
	connectionString: '',
	dbId: '',
};

// Define reducers
const rootReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		//test
		case SET_TOKEN:
			return { ...state, token: action.payload };
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
		case SET_SHOW_INPUT:
			return { ...state, showInput: action.payload };
		case SET_DB_NAME:
			return { ...state, dbName: action.payload };
		case SET_CONNECTION_STRING:
			return { ...state, connectionString: action.payload };
		case SET_DB_ID:
			return { ...state, dbId: action.payload };
		default:
			return state;
	}
};

// Create Redux store
const store = configureStore({
	reducer: rootReducer,
});

export default store;
