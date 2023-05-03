import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const AM0103Context = 'AM0103Context';
const tag = AM0103Context;
const AM0103ActionList = Object.freeze({
  UpdateContext: AM0103Context + '/update',
  ResetContext: AM0103Context + '/reset',
});

const AM0103InitalState = {};

const AM0103Actions = {};

AM0103Actions[AM0103ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (AM0103Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, AM0103Context: payload.data };
};

AM0103Actions[AM0103ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (AM0103Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...AM0103InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, AM0103Context, AM0103Actions, {
    ...AM0103InitalState,
    ...data,
  });
};
export { createContext, AM0103Context, AM0103Actions, AM0103ActionList };
