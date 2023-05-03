import { useEffect } from 'react';
import AM0103Domain from '../domains/AM0103Domain';
import AM0103Detail from './AM0103Detail';
import { Col } from 'antd';

export function AM0103Content() {
  // gọi
  const [context, domain] = AM0103Domain();
  // context => lưu giá trị
  // domain => lưu function

  useEffect(() => {
    // khởi tạo  => biến cục bộ
    domain.initDomain();
  }, []);

  return (
    <Col className="h-full py-10" offset={2} span={20}>
      <AM0103Detail context={context} domain={domain} />
    </Col>
  );
}
