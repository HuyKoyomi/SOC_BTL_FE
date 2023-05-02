import AM01Router from "@containers/admin-module/am.01-hotel_manager/AM01Router";

import CommonRoutes from "@containers/common-module/CommonRouter";

const routes = [
  //am
  ...AM01Router,

  //um

  //cm
  ...CommonRoutes,
];
export default routes;
