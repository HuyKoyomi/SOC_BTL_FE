import { createSlice } from '@core/store/store';
import log from '../ModuleLogger';
const UM0102Context = 'UM0102Context';
const tag = UM0102Context;
const UM0102ActionList = Object.freeze({
  UpdateContext: UM0102Context + '/update',
  ResetContext: UM0102Context + '/reset',
});

const UM0102InitalState = {};

const UM0102Actions = {};

UM0102Actions[UM0102ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, 'A00_UPDATE_CONTEXT', payload);
  if (UM0102Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, UM0102Context: payload.data };
};

UM0102Actions[UM0102ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, 'A00_RESET_CONTEXT');
  if (UM0102Context != payload?.slice) {
    log.error(tag, 'context not match', payload?.slice || 'undefined');
    return state;
  }
  return { ...state, ...UM0102InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, UM0102Context, UM0102Actions, {
    ...UM0102InitalState,
    ...data,
  });
};
export { createContext, UM0102Context, UM0102Actions, UM0102ActionList };
