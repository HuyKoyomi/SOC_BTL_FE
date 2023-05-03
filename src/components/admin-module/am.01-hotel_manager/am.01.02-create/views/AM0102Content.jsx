import { Col } from 'antd';
import { useEffect } from 'react';
import AM0102Domain from '../domains/AM0102Domain';
import AM0102List from './AM0102Create';
export function AM0102Content() {
  // gọi
  const [context, domain] = AM0102Domain();
  // context => lưu giá trị
  // domain => lưu function

  useEffect(() => {
    // khởi tạo  => biến cục bộ
    domain.initDomain();
  }, []);

  return (
    <Col className="h-full py-10" offset={2} span={20}>
      <AM0102List context={context} domain={domain} />
    </Col>
  );
}
