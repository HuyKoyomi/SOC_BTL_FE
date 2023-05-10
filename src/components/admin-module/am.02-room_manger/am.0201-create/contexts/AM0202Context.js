import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const AM0202Context = 'AM0202Context';
const tag = AM0202Context;
const AM0202ActionList = Object.freeze({
  UpdateContext: AM0202Context + '/update',
  ResetContext: AM0202Context + '/reset',
});

const AM0202InitalState = {};

const AM0202Actions = {};

AM0202Actions[AM0202ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (AM0202Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, AM0202Context: payload.data };
};

AM0202Actions[AM0202ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (AM0202Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...AM0202InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, AM0202Context, AM0202Actions, {
    ...AM0202InitalState,
    ...data,
  });
};
export { createContext, AM0202Context, AM0202Actions, AM0202ActionList };
