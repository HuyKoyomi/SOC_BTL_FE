import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
const log = logger.getLogger('Store');
prefix.apply(log);
export default log;
