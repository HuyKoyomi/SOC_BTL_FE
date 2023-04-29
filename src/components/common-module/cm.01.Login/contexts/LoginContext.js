import { createSlice } from "@core/store/store";
import log from "../ModuleLogger";
const LoginContext = "LoginContext";
const tag = LoginContext;
const LoginActionList = Object.freeze({
  UpdateContext: LoginContext + "/update",
  ResetContext: LoginContext + "/reset",
});

const LoginInitalState = {};

const LoginActions = {};

LoginActions[LoginActionList.UpdateContext] = (state, payload) => {
  log.trace(tag, "A00_UPDATE_CONTEXT", payload);
  if (LoginContext != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, LoginContext: payload.data };
};

LoginActions[LoginActionList.ResetContext] = (state, payload) => {
  log.trace(tag, "A00_RESET_CONTEXT");
  if (LoginContext != payload?.slice) {
    log.error(tag, "context not match", payload?.slice || "undefined");
    return state;
  }
  return { ...state, ...LoginInitalState };
};

const createContext = (dispatcher, data) => {
  createSlice(dispatcher, LoginContext, LoginActions, {
    ...LoginInitalState,
    ...data,
  });
};
export { createContext, LoginContext, LoginActions, LoginActionList };
