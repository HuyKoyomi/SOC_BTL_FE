import MainLayout from '@layout/MainLayout';
import UserListPage from 'src/pages/admin-module/user/UserListPage';

const UserRouter = [
  {
    path: '/admin/user',
    name: 'Quản lý khách hàng',
    layout: MainLayout, // sử dụng cho admin
    component: UserListPage,
    isPublic: true,
    exact: true,
  },
  // {
  //   path: '/admin/user/create',
  //   name: 'Thêm mới khách hàng',
  //   layout: MainLayout, // sử dụng cho admin
  //   component: CreateUserPage,
  //   isPublic: true,
  //   exact: true,
  // },
];
export default UserRouter;
