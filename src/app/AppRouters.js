import AM01Router from '@containers/admin-module/am.01-hotel_manager/AM01Router';
import CommonRoutes from '@containers/common-module/CommonRouter';
import UM01Router from '@containers/user-module/um.01-rent_room/UM01Router';

const routes = [
  //am
  ...AM01Router,

  //um
  ...UM01Router,
  //cm
  ...CommonRoutes,
];
export default routes;
