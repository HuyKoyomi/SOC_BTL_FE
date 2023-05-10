import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { Button, Card, Input, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMainStore } from 'src/store/hook';
import { userActions } from 'src/store/reducer';

const UserListPage = () => {
  const common = UseCommon();
  const navigate = useNavigate();
  const [{ userList }, dispatch] = useMainStore();
  const [data, setData] = useState([]);
  const axiosAPI = useAxiosAPI();

  // "id": 1,
  // "name": "Tanh",
  // "email": "testqa@a.com",
  // "imageUrl": "http://localhost:9000/tanh-bucket/null",
  // "emailVerified": false,
  // "password": "$2a$10$0Gd3TYTJ928hnWgZ8GI9qugzogjPNfQy2MQqqf/vEBMpS5hp1c1Ba",
  // "provider": "local",
  // "providerId": null,
  // "role": "ADMIN"
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      fixed: 'left',
      width: 100,
      render: (record, value, index) => index + 1,
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 200,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Tooltip
          title="Xem chi tiết"
          color="#1677ff"
          onClick={() => {
            navigate(`/admin/user/${(_, record.id)}`);
          }}
        >
          <a style={{ color: '#1677ff' }}>
            <EyeOutlined />
          </a>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    const getList = async (page = 0, pageSize = 1000000) => {
      try {
        common?.backdrop(true); // tạo spin quay
        const url = `/admin/user/search?page=${page}&size=${pageSize}`;
        const response = await axiosAPI.post(url, {
          name: null,
          role: null,
        });
        const { data } = response?.data || {};
        dispatch(userActions.setUserList(data.content));
        common?.backdrop(false);
      } catch (error) {
        common?.backdrop(false);
        console.log('error: ', error);
      }
    };
    getList();
  }, []);

  useEffect(() => {
    setData(userList);
  }, [userList]);

  return (
    <Card
      title="Quản lý người dùng"
      extra={
        <Space className="w-[800]">
          <Input
            placeholder="Tìm kiếm theo tên người dùng"
            allowClear
            prefix={<SearchOutlined />}
            className="w-[600]"
            onChange={(e) => {
              const currValue = e.target.value.trim();
              const filteredData = userList?.filter(
                (entry) =>
                  entry?.nameHotel
                    ?.toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry?.telephoneContact.includes(currValue.toLowerCase()),
              );
              setData(filteredData);
            }}
          />
          <Button className="text-cyan-1 bg-blue-6">Thêm mới</Button>
        </Space>
      }
    >
      <Table rowKey="id" columns={columns} dataSource={data} />
    </Card>
  );
};

export default UserListPage;
