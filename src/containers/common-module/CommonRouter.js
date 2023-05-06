import LoginContent from './Login';

const CommonRoutes = [
  {
    path: '/',
    name: 'Đăng nhập',
    layout: null,
    component: LoginContent,
    isPublic: true,
    exact: true,
  },
];
export default CommonRoutes;
