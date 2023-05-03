/*
  Lưu ý: key = "url"
*/

const AdminMenu = [
  {
    key: '/admin/home',
    label: 'Quản lý khách sạn',
    icon: '',
  },
  {
    key: '/Quản lý loại phòng',
    icon: '',
    children: null,
    label: 'Quản lý loại phòng',
  },
  {
    key: '/Quản lý phòng',
    icon: '',
    children: null,
    label: 'Quản lý phòng',
  },
  {
    key: '/Quản lý người dùng',
    icon: '',
    children: null,
    label: 'Quản lý người dùng',
  },
  {
    key: '/Check-in check-out phòng khách',
    icon: '',
    children: null,
    label: 'Check-in check-out phòng khách',
  },
  {
    key: '/Đặt phòng trực tiếp',
    icon: '',
    children: null,
    label: 'Đặt phòng trực tiếp',
  },
  {
    key: '/Quản lý dịch vụ',
    icon: '',
    children: null,
    label: 'Quản lý dịch vụ',
  },
];
const UserMenu = [
  {
    key: '/user/home',
    label: 'Chức năng thuê khách sạn online',
    icon: '',
  },
  {
    key: '/user/check-in-out',
    label: 'Check-in check-out phòng bản thân',
    icon: '',
  },
];
export { AdminMenu, UserMenu };
