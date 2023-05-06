import { useContext } from 'react';
import { MainStoreContext } from './context';

export const useMainStore = () => {
  return useContext(MainStoreContext);
};
