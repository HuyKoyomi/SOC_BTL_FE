import { Tag } from 'antd';

export const ROLE_CONVERT = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};
export function STATUS_RENDER(status) {
  switch (status) {
    case 0:
      return <Tag color="processing">Chưa có người sử dụng</Tag>;
    case 1:
      return <Tag color="success">Đã có người sử dụng</Tag>;
    case 2:
      return <Tag color="warning">Phòng đang sửa chữa</Tag>;
    case 3:
      return <Tag color="error">Phòng đã bị xóa</Tag>;
  }
}
