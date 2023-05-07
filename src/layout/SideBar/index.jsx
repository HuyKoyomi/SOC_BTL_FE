import logo from '@assets/img/logo.webp';
import { AdminMenu, UserMenu } from '@layout/MenuSideBar';
import { Image, Layout, Menu } from 'antd';
import MenuItem from 'antd/es/menu/MenuItem';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const { Sider } = Layout;

const LayoutSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={250}
      theme="light"
    >
      <Image
        width={collapsed ? 70 : 150}
        src={logo}
        preview={false}
        className="m-2"
      />
      <Menu theme={'light'} defaultSelectedKeys={0} mode="inline">
        {sessionStorage.getItem('role') == 'ADMIN' &&
          _.map(AdminMenu, (item, index) => (
            <MenuItem
              mode="inline"
              key={index}
              icon={item?.icon}
              children={item?.children}
              onClick={() => navigate(item?.path)}
              className="text-base font-semibold my-3"
            >
              {item?.label}
            </MenuItem>
          ))}
        {sessionStorage.getItem('role') == 'USER' &&
          _.map(UserMenu, (item, index) => (
            <MenuItem
              mode="inline"
              key={index}
              icon={item?.icon}
              children={item?.children}
              onClick={() => navigate(item?.path)}
              className="text-base font-semibold my-3"
            >
              {item?.label}
            </MenuItem>
          ))}
      </Menu>
    </Sider>
  );
};
export default LayoutSideBar;
