import { useEffect } from 'react';
import AM0201Domain from '../domains/AM0201Domain';
import AM0201List from './AM0201List';

export function AM0201Content() {
  const [context, domain] = AM0201Domain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  return (
    <div className="h-full pt-8 pl-8 pr-8">
      <AM0201List context={context} domain={domain} />
    </div>
  );
}
