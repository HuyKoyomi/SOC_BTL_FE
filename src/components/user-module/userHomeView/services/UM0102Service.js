import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  UM0102ActionList,
  UM0102Context,
  createContext,
} from '../contexts/UM0102Context';

function UM0102Service() {
  const context = useStore()[UM0102Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: UM0102Context,
      type: UM0102ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: UM0102Context,
      type: UM0102ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default UM0102Service;
