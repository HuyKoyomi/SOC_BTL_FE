import { createSlice } from "@core/store/store";
import log from "../ModuleLogger";
const AM0101Context = "AM0101Context";
const tag = AM0101Context;
const AM0101ActionList = Object.freeze({
  UpdateContext: AM0101Context + "/update",
  ResetContext: AM0101Context + "/reset",
});

const AM0101InitalState = {};

const AM0101Actions = {};

AM0101Actions[AM0101ActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, "A00_UPDATE_CONTEXT", payload);
  if (AM0101Context != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, AM0101Context: payload.data };
};

AM0101Actions[AM0101ActionList.ResetContext] = (state, payload) => {
  log.trace(tag, "A00_RESET_CONTEXT");
  if (AM0101Context != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, ...AM0101InitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, AM0101Context, AM0101Actions, {
    ...AM0101InitalState,
    ...data,
  });
};
export { createContext, AM0101Context, AM0101Actions, AM0101ActionList };
