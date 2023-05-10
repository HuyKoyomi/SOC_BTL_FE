import AM01Router from '@containers/admin-module/am.01-hotel_manager/AM01Router';
import AM02Router from '@containers/admin-module/am.02-room_manager/AM02Router';
import CommonRoutes from '@containers/common-module/CommonRouter';
import UserRoutes from '@containers/user-module/UserLogin';
import RoomRouter from 'src/routers/RoomRouter';
import RoomTypeRouter from 'src/routers/RoomTypeRouter';
import UserRouter from 'src/routers/UserRouter';

const routes = [
  //am
  ...AM01Router,
  ...AM02Router,
  ...RoomTypeRouter,
  // ...RoomRouter,

  //um
  ...UserRoutes,
  ...UserRouter,

  //cm
  ...CommonRoutes,
];
export default routes;
