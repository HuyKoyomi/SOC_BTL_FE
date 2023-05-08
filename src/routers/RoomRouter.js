import MainLayout from '@layout/MainLayout';
import RoomListPage from 'src/pages/admin-module/room/RoomListPage';

const RoomRouter = [
  {
    path: '/admin/room',
    name: 'Quản lý phòng',
    layout: MainLayout, // sử dụng cho admin
    component: RoomListPage,
    isPublic: true,
    exact: true,
  },
];
export default RoomRouter;
