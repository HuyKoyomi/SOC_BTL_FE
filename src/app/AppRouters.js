import AM01Router from '@containers/admin-module/am.01-hotel_manager/AM01Router';
import CommonRoutes from '@containers/common-module/CommonRouter';
import RoomTypeRouter from 'src/routers/RoomTypeRouter';

const routes = [
  //am
  ...AM01Router,
  ...RoomTypeRouter,

  //cm
  ...CommonRoutes,
];
export default routes;
