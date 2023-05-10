import avatar from '@assets/img/avatar.jpg';
import { Col, Dropdown, Layout, Row, Typography, message, theme } from 'antd';
import { BiHelpCircle } from 'react-icons/bi';
import { FiLogOut } from 'react-icons/fi';
import { HiOutlineBell, HiOutlineUserCircle } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
export default function LayoutHeader() {
  const navigate = useNavigate();

  const items = [
    {
      key: '1',
      label: 'Thông tin tài khoản',
      icon: <HiOutlineUserCircle size={15} />,
    },
    {
      key: '2',
      label: 'Đổi mật khẩu',
      icon: <RiLockPasswordLine size={15} />,
    },
    {
      key: '3',
      label: 'Trợ giúp',
      icon: <BiHelpCircle size={15} />,
    },
    {
      key: '4',
      danger: true,
      label: (
        <Typography.Link
          onClick={(_e) => {
            navigate('/');
          }}
        >
          Đăng xuất
        </Typography.Link>
      ),

      icon: <FiLogOut size={15} />,
    },
  ];

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Row className="h-full ">
        <Col span={20} offset={1}>
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Quản lý khách sạn</Breadcrumb.Item>
            <Breadcrumb.Item>Danh sách</Breadcrumb.Item>
          </Breadcrumb> */}
        </Col>
        <Col span={3} className="h-full flex justify-center items-center">
          <Typography.Link
            onClick={(e) => {
              message.info('Không có thông báo nào 😂');
            }}
            className="rounded-full bg-blue-5 mr-6"
          >
            <HiOutlineBell size={25} color="white" />
          </Typography.Link>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
            placement="bottomLeft"
          >
            <img
              className="w-[50px] h-[50px] rounded-full"
              src={avatar}
              alt="avatar"
            />
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
}
