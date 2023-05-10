import { formatCurrency } from '@common/Utils';
import { STATUS_RENDER } from '@components/admin-module/am.02-room_manger/am.0201-list/views/Contant';
import { Card, Col, Modal, Row, Space, Typography } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UM0101List({ context, domain }) {
  const { listDataTable, listDataCount } = context || {};
  const [data, setData] = useState(listDataTable);
  const navigate = useNavigate();

  useEffect(() => {
    setData(context?.listDataTable);
  }, [context?.listDataTable]);

  return (
    <>
      <Modal></Modal>
      <Card
        title="Danh sách phòng khách sạn"
        extra={<Space className="w-[800]"></Space>}
      >
        <Row gutter={{ sm: 8, lg: 16 }}>
          {_.map(data, (item) => (
            <Col key={item?.roomResponse?.id} span={12} lg={6}>
              <Typography.Link
                className="w-full"
                onClick={() => domain.goToViewPage(item?.roomResponse?.id)}
              >
                <Card hoverable className=" my-4">
                  <div className="flex flex-col">
                    <img
                      src={item?.imageStoreLink[0]?.fileUrl}
                      className="w-full]"
                    />

                    <div className="info-wrap mt-3">
                      <div className=" ">
                        <div>
                          {`Phòng ${item?.roomResponse?.numberRoom} - Tầng ${item?.roomResponse?.floor}`}
                        </div>
                        <div>
                          {`Giá phòng: `}
                          <span
                            className="font-bold"
                            style={{ color: '#2EB553' }}
                          >
                            {formatCurrency(item?.roomResponse?.cost)}
                          </span>
                          {` VND`}
                        </div>
                        <div>
                          {`Loại phòng: ${item?.roomResponse?.roomType[0].nameRoomType}`}
                        </div>
                        <div>
                          {`Trạng thái: `}
                          {STATUS_RENDER(item?.roomResponse?.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </Typography.Link>
            </Col>
          ))}
        </Row>
      </Card>
    </>
  );
}
