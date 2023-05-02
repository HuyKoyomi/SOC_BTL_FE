import { useEffect } from "react";
import AM0101Domain from "../domains/AM0101Domain";
import AM0101List from "./AM0101List";

export function AM0101Content() {
  // gọi
  const [context, domain] = AM0101Domain();
  // context => lưu giá trị
  // domain => lưu function

  useEffect(() => {
    // khởi tạo  => biến cục bộ
    domain.initDomain();
  }, []);

  return (
    <div className="h-full pt-8 pl-8 pr-8">
      <AM0101List context={context} domain={domain} />
    </div>
  );
}
