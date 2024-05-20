// store.ts
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

// Define action types
const SET_USER = 'SET_USER';
const SET_DATABASES = 'SET_DATABASES';
const SET_SELECTED_TABLE = 'SET_SELECTED_TABLE';
const SET_SELECTED_DATABASE = 'SET_SELECTED_DATABASE';
const SET_SELECTED_MIGRATION = 'SET_SELECTED_MIGRATION';
const SET_SHOW_INPUT = 'SET_SHOW_INPUT';
const SET_DB_NAME = 'SET_DB_NAME';
const SET_CONNECTION_STRING = 'SET_CONNECTION_STRING';

// Define action creators
export const setUser = (user: string) => ({ type: SET_USER, payload: user });
export const setDatabases = (databases: string[]) => ({
	type: SET_DATABASES,
	payload: databases,
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

// Define initial state
const initialState = {
	user: '',
	databases: ['pokemon', 'dragons', 'digimon'],
	selectedTable: '',
	selectedDatabase: '',
	selectedMigration: '',
	showInput: false,
	dbName: '',
	connectionString: '',
};

// Define reducers
const rootReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case SET_DATABASES:
			return { ...state, databases: action.payload };
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
		default:
			return state;
	}
};

// Create Redux store
const store = createStore(rootReducer);

export default store;
