import { useEffect } from 'react';
import UM0101Domain from '../domains/UM0101Domain';
import UM0101List from './UM0101List';

export function UserHomeContent() {
  // gọi
  const [context, domain] = UM0101Domain();
  // context => lưu giá trị
  // domain => lưu function

  useEffect(() => {
    // khởi tạo  => biến cục bộ
    domain.initDomain();
  }, []);

  return (
    <div className="h-full pt-8 pl-8 pr-8">
      <UM0101List context={context} domain={domain} />
    </div>
  );
}
