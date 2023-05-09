import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const UM0201Context = 'UM0201Context';
const tag = UM0201Context;
const UM0201ActionList = Object.freeze({
  UpdateContext: UM0201Context + '/update',
  ResetContext: UM0201Context + '/reset',
});

const UM0201InitalState = {};

const UM0201Actions = {};

UM0201Actions[UM0201ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (UM0201Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, UM0201Context: payload.data };
};

UM0201Actions[UM0201ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (UM0201Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...UM0201InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, UM0201Context, UM0201Actions, {
    ...UM0201InitalState,
    ...data,
  });
};
export { createContext, UM0201Context, UM0201Actions, UM0201ActionList };
