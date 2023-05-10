import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const AM0201Context = 'AM0201Context';
const tag = AM0201Context;
const AM0201ActionList = Object.freeze({
  UpdateContext: AM0201Context + '/update',
  ResetContext: AM0201Context + '/reset',
});

const AM0201InitalState = {};

const AM0201Actions = {};

AM0201Actions[AM0201ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (AM0201Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, AM0201Context: payload.data };
};

AM0201Actions[AM0201ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (AM0201Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...AM0201InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, AM0201Context, AM0201Actions, {
    ...AM0201InitalState,
    ...data,
  });
};
export { createContext, AM0201Context, AM0201Actions, AM0201ActionList };
