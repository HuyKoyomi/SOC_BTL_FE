import { useRef } from "react";
import { useDispatch, useStore } from "@core/store/store";
import {
  LoginActionList,
  LoginContext,
  createContext,
} from "../contexts/LoginContext";

function CM01LogintService() {
  const context = useStore()[LoginContext];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: LoginContext,
      type: LoginActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: LoginContext,
      type: LoginActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default CM01LogintService;
