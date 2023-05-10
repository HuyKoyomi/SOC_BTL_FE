import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  AM0201ActionList,
  AM0201Context,
  createContext,
} from '../contexts/AM0201Context';

function AM0201Service() {
  const context = useStore()[AM0201Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: AM0201Context,
      type: AM0201ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: AM0201Context,
      type: AM0201ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default AM0201Service;
