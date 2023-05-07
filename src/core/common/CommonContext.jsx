import { Spin } from 'antd';
import React, { useState } from 'react';

const CommonContext = React.createContext(null);

export const CommonProvider = ({ children }) => {
  const [isOpenBackdrop, setOpenBackdrop] = useState(false);
  const [isCountBackdrop, setCountBackdrop] = useState(false);
  const [backdropMessage, setBackdropMessage] = useState('');

  const backdrop = (isOpen = false, isCount = false, message = '') => {
    setOpenBackdrop(isOpen);
    setCountBackdrop(isCount);
    if (message) {
      setBackdropMessage(message);
    }
  };

  const value = {
    isOpenBackdrop,
    isCountBackdrop,
    backdropMessage,
    backdrop,
  };

  return (
    <>
      <Spin
        spinning={isOpenBackdrop}
        tip={
          <>
            <div>Hệ thống đang tải...</div>
            <div>Vui lòng đợi trong giây lát phút! 🥰🥰🥰</div>
          </>
        }
        size={'large'}
      >
        <CommonContext.Provider value={value}>
          {children}
        </CommonContext.Provider>
      </Spin>
    </>
  );
};

export default CommonContext;
