import { useRef } from "react";
import { useDispatch, useStore } from "@core/store/store";
import {
  AM0102ActionList,
  AM0102Context,
  createContext,
} from "../contexts/AM0102Context";

function AM0102Service() {
  const context = useStore()[AM0102Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: AM0102Context,
      type: AM0102ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: AM0102Context,
      type: AM0102ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default AM0102Service;
