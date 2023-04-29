import { Layout } from "antd";
import Scrollbars from "react-custom-scrollbars";
const { Content } = Layout;
export default function LayoutContent({ children }) {
  return (
    <Content>
      <Scrollbars key={1}>{children}</Scrollbars>
    </Content>
  );
}
