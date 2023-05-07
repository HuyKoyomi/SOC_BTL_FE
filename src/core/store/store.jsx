import { createContext, useContext, useReducer } from 'react';
import log from './ModuleLogger';
const tag = 'Store';

const storeContext = createContext();
const dispatchContext = createContext();

let actions = {
  '/CREATE_SLICE': (state, payload) => {
    log.trace(tag, 'CREATE_SLICE', payload);
    return { ...state, ...payload };
  },
};

const reducer = (state, action) => {
  log.trace(tag, 'reducer action', action);

  if (action.type == 'CREATE_SLICE') {
    let payload = {};
    payload[action.slice] = action.data;
    return actions['/CREATE_SLICE'](state, payload);
  }
  try {
    return actions[action.type](state, action);
  } catch (error) {
    log.trace(tag, 'reducer action', error);
  }
};

export const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, {});

  return (
    <dispatchContext.Provider value={dispatch}>
      <storeContext.Provider value={store}>{children}</storeContext.Provider>
    </dispatchContext.Provider>
  );
};

export function useStore() {
  return useContext(storeContext);
}

export function useDispatch() {
  return useContext(dispatchContext);
}

export const createSlice = (dispatch, slice, sliceActions, initialState) => {
  actions = { ...actions, ...sliceActions };

  dispatch({
    slice: slice,
    type: 'CREATE_SLICE',
    data: initialState,
  });
};

export default function initStore(initialState) {
  const storeContext = createContext();
  const dispatchContext = createContext();
  const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };
  function useStore() {
    return useContext(storeContext);
  }

  function useDispatch() {
    return useContext(dispatchContext);
  }
  return [StoreProvider, useStore, useDispatch];
}
