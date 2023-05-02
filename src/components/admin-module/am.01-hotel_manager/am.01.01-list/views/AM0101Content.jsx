import { useEffect } from "react";
import AM0101Domain from "../domains/AM0101Domain";
import AM0101List from "./AM0101List";

export function AM0101Content() {
  const [context, domain] = AM0101Domain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  return (
    <div className="h-full pt-8 pl-8 pr-8">
      <AM0101List context={context} domain={domain} />
    </div>
  );
}
