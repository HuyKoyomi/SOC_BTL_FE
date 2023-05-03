import { useRef } from 'react';
import { useDispatch, useStore } from '@core/store/store';
import {
  AM0103ActionList,
  AM0103Context,
  createContext,
} from '../contexts/AM0103Context';

function AM0103Service() {
  const context = useStore()[AM0103Context];
  const dispatcher = useDispatch();

  const initContext = (data) => {
    createContext(dispatcher, data);
  };
  const updateContext = (data) => {
    dispatcher({
      slice: AM0103Context,
      type: AM0103ActionList.UpdateContext,
      data: data,
    });
  };
  const resetContext = () => {
    dispatcher({
      slice: AM0103Context,
      type: AM0103ActionList.ResetContext,
    });
  };
  const dispatchInterface = useRef({
    initContext,
    updateContext,
    resetContext,
  });

  return [context, dispatchInterface.current];
}

export default AM0103Service;
