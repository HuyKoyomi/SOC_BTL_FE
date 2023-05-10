import MainLayout from '@layout/MainLayout';
import { lazy } from 'react';

const AM02Router = [
  {
    path: '/admin/room',
    name: 'Quản lý khách sạn',
    layout: MainLayout, // sử dụng cho admin
    component: lazy(() => import('./AM0201List')),
    isPublic: true,
    exact: true,
  },
  {
    path: '/admin/room/:mode/:id',
    name: 'Quản lý khách sạn - Tạo/Xem/Sửa',
    layout: MainLayout,
    component: lazy(() => import('./AM0202Create')),
    isPublic: true,
    exact: true,
  },
];
export default AM02Router;
