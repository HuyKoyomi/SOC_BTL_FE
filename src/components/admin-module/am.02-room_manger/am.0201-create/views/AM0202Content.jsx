import { Col } from 'antd';
import { useEffect } from 'react';
import AM0202Domain from '../domains/AM0202Domain';
import AM0202List from './AM0202Create';
export function AM0202Content() {
  // gọi
  const [context, domain] = AM0202Domain();
  // context => lưu giá trị
  // domain => lưu function

  useEffect(() => {
    // khởi tạo  => biến cục bộ
    domain.initDomain();
  }, []);

  return (
    <Col className="h-full py-10" offset={2} span={20}>
      <AM0202List context={context} domain={domain} />
    </Col>
  );
}
