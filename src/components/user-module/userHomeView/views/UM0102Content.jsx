import { Col } from 'antd';
import { useEffect } from 'react';
import UM0102Domain from '../domains/UM0102Domain';
import UM0102List from './UM0102Create';
export function UM0102Content() {
  const [context, domain] = UM0102Domain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  return (
    <Col className="h-full py-10" offset={2} span={20}>
      <UM0102List context={context} domain={domain} />
    </Col>
  );
}
