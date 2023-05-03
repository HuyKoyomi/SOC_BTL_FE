import MainLayout from '@layout/MainLayout';
import { lazy } from 'react';

const AM01Router = [
  {
    path: '/admin/home',
    name: 'Quản lý khách sạn',
    layout: MainLayout, // sử dụng cho admin
    component: lazy(() => import('./AM0101List')),
    isPublic: true,
    exact: true,
  },
  {
    path: '/admin/home/:mode/:id',
    name: 'Quản lý khách sạn - Tạo/Xem/Sửa',
    layout: MainLayout,
    component: lazy(() => import('./AM0102Create')),
    isPublic: true,
    exact: true,
  },
];
export default AM01Router;
