import { Layout } from 'antd';
import LayoutContent from './Content';
import LayoutFooter from './Footer';
import LayoutHeader from './Header';
import LayoutSideBar from './SideBar';

const MainLayout = ({ children }) => {
  return (
    <Layout className="h-screen">
      <LayoutSideBar />
      <Layout className="site-layout">
        <LayoutHeader />
        <LayoutContent>{children}</LayoutContent>
        <LayoutFooter />
      </Layout>
    </Layout>
  );
};
export default MainLayout;
