import AM01Router from '@containers/admin-module/am.01-hotel_manager/AM01Router';
import CommonRoutes from '@containers/common-module/CommonRouter';
import UserRoutes from '@containers/user-module/UserLogin';
import RoomRouter from 'src/routers/RoomRouter';
import RoomTypeRouter from 'src/routers/RoomTypeRouter';

const routes = [
  //am
  ...AM01Router,
  ...RoomTypeRouter,
  ...RoomRouter,

  //um
  ...UserRoutes,

  //cm
  ...CommonRoutes,
];
export default routes;
