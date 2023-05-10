import MainLayout from '@layout/MainLayout';
import DetailUserPage from 'src/pages/admin-module/user/DetailUserPage';
import UserListPage from 'src/pages/admin-module/user/UserListPage';

const UserRouter = [
  {
    path: '/admin/user',
    name: 'Quản lý người dùng',
    layout: MainLayout, // sử dụng cho admin
    component: UserListPage,
    isPublic: true,
    exact: true,
  },
  {
    path: '/admin/user/:id',
    name: 'Chi tiết người dùng',
    layout: MainLayout, // sử dụng cho admin
    component: DetailUserPage,
    isPublic: true,
    exact: true,
  },
];
export default UserRouter;
