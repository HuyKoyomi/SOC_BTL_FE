import { Layout, theme } from 'antd';

const { Header } = Layout;
export default function LayoutHeader() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      {/* <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Báo cáo</Breadcrumb.Item>
        <Breadcrumb.Item>Xem</Breadcrumb.Item>
        <Breadcrumb.Item>Bill</Breadcrumb.Item>
      </Breadcrumb> */}
    </Header>
  );
}
