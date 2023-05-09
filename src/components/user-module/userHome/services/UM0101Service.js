import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  UM0101ActionList,
  UM0101Context,
  createContext,
} from '../contexts/UM0101Context';

function UM0101Service() {
  const context = useStore()[UM0101Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: UM0101Context,
      type: UM0101ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: UM0101Context,
      type: UM0101ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default UM0101Service;
