import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  UM0201ActionList,
  UM0201Context,
  createContext,
} from '../contexts/UM0201Context';

function UM0201Service() {
  const context = useStore()[UM0201Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: UM0201Context,
      type: UM0201ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: UM0201Context,
      type: UM0201ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default UM0201Service;
