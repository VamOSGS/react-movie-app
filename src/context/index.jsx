import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer';

export const StateContext = createContext();

export function StateProvider({ children, initialState }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateValue = () => useContext(StateContext);
