import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  AM0202ActionList,
  AM0202Context,
  createContext,
} from '../contexts/AM0202Context';

function AM0202Service() {
  const context = useStore()[AM0202Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: AM0202Context,
      type: AM0202ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: AM0202Context,
      type: AM0202ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default AM0202Service;
