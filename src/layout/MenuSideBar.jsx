import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai';
import { BiDrink, BiPhoneCall } from 'react-icons/bi';
import { MdOutlineBedroomParent } from 'react-icons/md';
import { RiCalendarCheckLine } from 'react-icons/ri';

/*
  Lưu ý: path = "url"
*/
const AdminMenu = [
  {
    path: '/admin/home',
    label: 'Quản lý khách sạn',
    icon: <AiOutlineHome size={20} />,
  },
  {
    path: 'admin/room-type',
    icon: <MdOutlineBedroomParent size={20} />,
    label: 'Quản lý loại phòng',
  },
  {
    path: 'admin/room',
    icon: <MdOutlineBedroomParent size={20} />,
    label: 'Quản lý phòng',
  },
  {
    path: 'admin/Quản lý người dùng',
    icon: <AiOutlineUser size={20} />,
    label: 'Quản lý người dùng',
  },
  {
    path: '/Check-in check-out',
    icon: <RiCalendarCheckLine size={20} />,
    label: 'Check-in check-out',
  },
  {
    path: '/Đặt phòng trực tiếp',
    icon: <BiPhoneCall size={20} />,
    label: 'Đặt phòng trực tiếp',
  },
  {
    path: '/service',
    icon: <BiDrink size={20} />,
    children: null,
    label: 'Quản lý dịch vụ',
  },
];
const UserMenu = [
  {
    path: '/user/home',
    label: 'Chức năng thuê khách sạn online',
    icon: '',
  },
  {
    path: '/user/check-in-out',
    label: 'Check-in check-out phòng bản thân',
    icon: '',
  },
];
export { AdminMenu, UserMenu };
