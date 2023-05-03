import MainLayout from '@layout/MainLayout';
import { lazy } from 'react';

const UM01Router = [
  {
    path: '/user/home',
    name: 'Thuê khách sạn',
    layout: MainLayout,
    component: lazy(() => import('./UM01List')),
    isPublic: true,
    exact: true,
  },
];
export default UM01Router;
