import { SearchOutlined } from '@ant-design/icons';
import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { Button, Card, Col, Input, Row, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMainStore } from 'src/store/hook';
import { roomActions } from 'src/store/reducer';

const RoomListPage = () => {
  const [data, setData] = useState([]);
  const [{ roomList }, dispatch] = useMainStore();

  const common = UseCommon();
  const axiosAPI = useAxiosAPI();
  const navigate = useNavigate();

  useEffect(() => {
    const getList = async (page = 0, pageSize = 1000000) => {
      try {
        common?.backdrop(true); // tạo spin quay
        const url = `/admin/room/search?page=${page}&size=${pageSize}`;
        const response = await axiosAPI.post(url, {
          hotelId: null,
          roomTypeId: null,
          costFrom: null,
          costTo: null,
          floor: null,
        });
        const { data } = response?.data || {};
        dispatch(roomActions.setRoomList(data.content));
        common?.backdrop(false);
      } catch (error) {
        common?.backdrop(false);

        console.log('error: ', error);
      }
    };
    getList();
  }, []);

  useEffect(() => {
    setData(roomList);
  }, [roomList]);

  return (
    <Card
      title="Quản lý phòng"
      extra={
        <Space className="w-[800]">
          <Input
            placeholder="Tìm kiếm theo tên phòng"
            allowClear
            prefix={<SearchOutlined />}
            className="w-[600]"
            onChange={(e) => {
              const currValue = e.target.value.trim();
              const filteredData = roomList?.filter(
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
            onClick={() => {
              navigate('create');
            }}
          >
            Thêm mới
          </Button>
        </Space>
      }
    >
      <Row gutter={{ sm: 8, lg: 16 }}>
        {data.map((item) => (
          <Col key={item.roomResponse.id} span={12} lg={8}>
            <Card hoverable className=" my-4">
              <div className="flex flex-col">
                <img
                  src={item.imageStoreLink[0]?.fileUrl}
                  className="w-full]"
                />

                <div className="info-wrap mt-3">
                  <div className=" ">
                    <div>
                      {`Room ${item.roomResponse.numberRoom} - Floor ${item.roomResponse.floor}`}
                    </div>
                    <div>{`Price: ${item.roomResponse.cost}VND`}</div>
                    <div>
                      {`Type: ${item.roomResponse.roomType[0].nameRoomType}`}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default RoomListPage;
