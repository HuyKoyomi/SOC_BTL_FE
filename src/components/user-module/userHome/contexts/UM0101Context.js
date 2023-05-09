import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const UM0101Context = 'UM0101Context';
const tag = UM0101Context;
const UM0101ActionList = Object.freeze({
  UpdateContext: UM0101Context + '/update',
  ResetContext: UM0101Context + '/reset',
});

const UM0101InitalState = {};

const UM0101Actions = {};

UM0101Actions[UM0101ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (UM0101Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, UM0101Context: payload.data };
};

UM0101Actions[UM0101ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (UM0101Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...UM0101InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, UM0101Context, UM0101Actions, {
    ...UM0101InitalState,
    ...data,
  });
};
export { createContext, UM0101Context, UM0101Actions, UM0101ActionList };
