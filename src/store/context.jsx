/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react';
import mainReducer, { initialState } from './reducer';

export const MainStoreContext = createContext();

export default function MainStoreProvider({ children }) {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <MainStoreContext.Provider value={[state, dispatch]}>
      {children}
    </MainStoreContext.Provider>
  );
}
