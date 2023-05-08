/* eslint-disable react/prop-types */
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { Card, Input, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { useMainStore } from 'src/store/hook';
import { roomTypeActions } from 'src/store/reducer';

export default function RoomTypeListPage() {
  const [data, setData] = useState([]);
  const [{ roomTypeList }, dispatch] = useMainStore();

  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  useEffect(() => {
    setData(roomTypeList);
  }, [roomTypeList]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      key: 'stt',
      fixed: 'left',
      width: 200,
      render: (record, value, index) => index + 1,
    },
    {
      title: 'Tên khách sạn',
      dataIndex: 'nameRoomType',
      key: 'nameRoomType',
      width: 300,
    },
    {
      title: 'Miêu tả',
      dataIndex: 'describe',
      key: 'describe',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Tooltip
          title="Xem chi tiết"
          color="#1677ff"
          onClick={() => {
            dispatch(roomTypeActions.goToViewPage(record.id));
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
        const url = `/admin/room-type?page=${page}&size=${pageSize}`;
        const response = await axiosAPI.get(url);
        const { data } = response?.data || {};
        console.log('data: ', data);
        dispatch(roomTypeActions.setRoomTypeList(data));
        // setData(data);
        common?.backdrop(false);
      } catch (error) {
        common?.backdrop(false);

        console.log('error: ', error);
      }
    };
    getList();
  }, []);

  return (
    <Card
      title="Quản lý khách sạn"
      extra={
        <Space className="w-[800]">
          <Input
            placeholder="Tìm kiếm theo tên khách sạn"
            allowClear
            prefix={<SearchOutlined />}
            className="w-[600]"
            onChange={(e) => {
              const currValue = e.target.value.trim();
              const filteredData = roomTypeList?.filter(
                (entry) =>
                  entry?.nameHotel
                    ?.toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry?.telephoneContact.includes(currValue.toLowerCase()),
              );
              setData(filteredData);
            }}
          />
        </Space>
      }
    >
      <Table columns={columns} dataSource={data} key="id" />
    </Card>
  );
}
