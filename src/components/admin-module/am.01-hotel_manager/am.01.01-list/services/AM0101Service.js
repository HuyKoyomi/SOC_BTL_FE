import { useRef } from "react";
import { useDispatch, useStore } from "@core/store/store";
import {
  AM0101ActionList,
  AM0101Context,
  createContext,
} from "../contexts/AM0101Context";

function AM0101Service() {
  const context = useStore()[AM0101Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: AM0101Context,
      type: AM0101ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: AM0101Context,
      type: AM0101ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default AM0101Service;
