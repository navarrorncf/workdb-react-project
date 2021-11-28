import { createContext } from 'react';

export const AppContext = createContext();
export { initialState, reducer } from './AppReducer';
export * as actionTypes from './actionTypes';
