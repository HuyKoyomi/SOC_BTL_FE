import { Button, Card, Input, Space, Table, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import { EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function AM0101List({ context, domain }) {
  const { listDataTable, listDataCount } = context || {};
  const [data, setData] = useState(listDataTable);
  const navigate = useNavigate();

  useEffect(() => {
    setData(context?.listDataTable);
  }, [context?.listDataTable]);

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
      dataIndex: 'nameHotel',
      key: 'nameHotel',
      width: 300,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      width: 300,
    },
    {
      title: 'Số điện thoại liên lạc',
      dataIndex: 'telephoneContact',
      key: 'telephoneContact',
      width: 300,
    },
    {
      title: 'Mô tả',
      dataIndex: 'describe',
      key: 'describe',
      width: 300,
    },
    {
      title: 'Người quản lý',
      dataIndex: 'nameBankAccount',
      key: 'nameBankAccount',
      width: 300,
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      width: 300,
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 200,
      render: (_, record, index) => (
        <Tooltip
          title="Xem chi tiết"
          color="#1677ff"
          onClick={(e) => {
            domain.goToViewPage(record.id);
          }}
        >
          <a style={{ color: '#1677ff' }}>
            <EyeOutlined />
          </a>
        </Tooltip>
      ),
    },
  ];

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
              const filteredData = context?.listDataTable?.filter(
                (entry) =>
                  entry?.nameHotel
                    ?.toLowerCase()
                    .includes(currValue.toLowerCase()) ||
                  entry?.telephoneContact.includes(currValue.toLowerCase()),
              );
              setData(filteredData);
            }}
          />
          <Button
            className="text-cyan-1 bg-blue-6"
            onClick={(e) => domain.goToCreatePage()}
          >
            Thêm mới
          </Button>
        </Space>
      }
    >
      <Table rowKey="id" columns={columns} dataSource={data} />
    </Card>
  );
}
