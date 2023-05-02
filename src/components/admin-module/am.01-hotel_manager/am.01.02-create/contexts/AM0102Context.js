import { createSlice } from "@core/store/store";
import log from "../ModuleLogger";
const AM0102Context = "AM0102Context";
const tag = AM0102Context;
const AM0102ActionList = Object.freeze({
  UpdateContext: AM0102Context + "/update",
  ResetContext: AM0102Context + "/reset",
});

const AM0102InitalState = {};

const AM0102Actions = {};

AM0102Actions[AM0102ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, "A00_UPDATE_CONTEXT", payload);
  if (AM0102Context != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, AM0102Context: payload.data };
};

AM0102Actions[AM0102ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, "A00_RESET_CONTEXT");
  if (AM0102Context != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, ...AM0102InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, AM0102Context, AM0102Actions, {
    ...AM0102InitalState,
    ...data,
  });
};
export { createContext, AM0102Context, AM0102Actions, AM0102ActionList };
