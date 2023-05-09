import { useEffect } from 'react';
import UM0201Domain from '../domains/UM0201Domain';
import UM0201List from './UM0201List';

export function BookHomeContent() {
  // gọi
  const [context, domain] = UM0201Domain();
  // context => lưu giá trị
  // domain => lưu function

  useEffect(() => {
    // khởi tạo  => biến cục bộ
    domain.initDomain();
  }, []);

  return (
    <div className="h-full pt-8 pl-8 pr-8">
      <UM0201List context={context} domain={domain} />
    </div>
  );
}
