import { AdminMenu, UserMenu } from '@layout/MenuSideBar';
import { Layout, Menu } from 'antd';
import { useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useNavigate } from 'react-router-dom';
import './SideBar.less';
const { Sider } = Layout;

const LayoutSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(e.key);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          color: '#fff',
        }}
      >
        ICON
      </div>
      <Scrollbars>
        <Menu
          // theme={"light"}
          theme={'dark'}
          defaultSelectedKeys={
            sessionStorage.getItem('role') == 'ADMIN'
              ? AdminMenu[0].key
              : UserMenu[0].key
          }
          mode="inline"
          items={
            sessionStorage.getItem('role') == 'ADMIN' ? AdminMenu : UserMenu
          }
          onClick={onClick}
        />
      </Scrollbars>
    </Sider>
  );
};
export default LayoutSideBar;
