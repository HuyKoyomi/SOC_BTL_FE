import MainLayout from '@layout/MainLayout';

import RoomTypeListPage from 'src/pages/admin-module/room-type/RoomTypeListPage';

const RoomTypeRouter = [
  {
    path: '/admin/room-type',
    name: 'Quản lý Loại phòng',
    layout: MainLayout, // sử dụng cho admin
    component: RoomTypeListPage,
    isPublic: true,
    exact: true,
  },
];
export default RoomTypeRouter;
