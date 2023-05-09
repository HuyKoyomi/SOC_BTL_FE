import { HOTEL_STATUS } from '@components/admin-module/Contant';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import UploadImg from './UploadImg';
const { RangePicker } = DatePicker;

export default function UM0102List({ context, domain }) {
  const [form] = Form.useForm();
  const { mode, dataDetail } = context || {};
  const [fileList, setFileList] = useState([]);
  useUpdateEffect(() => {
    const { roomResponse, imageStoreLink } = dataDetail || {};
    form.setFieldsValue({
      floor: roomResponse?.floor,
      numberRoom: roomResponse?.numberRoom,
      cost: roomResponse?.cost,
      discountPercent: roomResponse?.discountPercent,
      discountCost: roomResponse?.discountCost,
      describe: roomResponse?.describe,
      status: roomResponse?.status,
      files: imageStoreLink,
    });
    let arr = [];
    _.map(imageStoreLink, (item) => {
      arr.push({
        uid: item?.id,
        name: item?.fileName,
        status: 'done',
        url: item?.fileUrl,
      });
    });
    setFileList(arr);
  }, [dataDetail]);

  const [form1] = Form.useForm();
  const [open, setOpen] = useState(false);
  const modalHandle = async () => {
    setOpen(!open);
  };
  useEffect(() => {
    form1.setFieldsValue({
      directBooking: false,
    });
  }, []);

  async function create() {
    await form1.validateFields();
    let params = await form1.getFieldsValue(true);
    params.roomId = dataDetail?.roomResponse.id;
    params.userId = parseInt(sessionStorage.getItem('userId'));
    console.log('params', params);
    await domain.create(params);
  }
  return (
    <>
      <Modal
        open={open}
        onCancel={modalHandle}
        footer={[
          <Button
            key={1}
            onClick={() => {
              modalHandle();
            }}
          >
            Hủy
          </Button>,
          <Button
            key={2}
            className="text-cyan-1 bg-blue-6"
            onClick={(e) => create()}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <Card title="Thông tin đặt phòng" className="w-full">
          <Form form={form1} autoComplete="off" layout="vertical">
            <Form.Item name="userNameDirectBooking" label="Người đặt chỗ">
              <Input placeholder="Nhập" />
            </Form.Item>
            <Form.Item name="rentalPeriod" label="Thời gian thuê">
              <InputNumber
                min={0}
                style={{ width: 200 }}
                placeholder="Nhập"
                max={365}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>{' '}
            <Form.Item name="directBooking">
              <Radio.Group disabled={true}>
                <Radio value={true}>Trực tiếp</Radio>
                <Radio value={false}>Đặt online</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="checkInTime" label="Thời gian checkin">
              <DatePicker
                showTime={{
                  format: 'HH:mm',
                }}
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
            <Form.Item name="checkOutTime" label="Thời gian checkout">
              <DatePicker
                showTime={{
                  format: 'HH:mm',
                }}
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
            <Form.Item name="deposit" label="Số tiền cọc">
              <InputNumber
                placeholder="Nhập"
                style={{ width: 200 }}
                className="mr-2"
                min={0}
                max={dataDetail?.roomResponse?.discountCost}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
              />
            </Form.Item>
          </Form>
        </Card>
      </Modal>
      <Card
        title={'Thông tin chi tiết phòng'}
        actions={[
          <Button
            onClick={(e) => {
              domain.goBack();
            }}
            key={1}
          >
            Quay lại
          </Button>,
          <Button
            className="text-cyan-1 bg-blue-6"
            onClick={(e) => {
              setOpen(true);
            }}
            key={2}
          >
            Đặt phòng
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 6 }}
          layout="horizontal"
          style={{ width: '100%' }}
          title="Form"
          form={form}
        >
          <Row span={24}>
            <Col offset={1} span={20}>
              <Form.Item label="Số phòng:" name="numberRoom">
                <Input className="w-full" disabled={true} />
              </Form.Item>
              <Form.Item label="Số tầng:" name="floor">
                <Input className="w-full" disabled={true} />
              </Form.Item>
              <Form.Item label="Trạng thái:" name="status">
                <Select
                  options={HOTEL_STATUS}
                  className="w-full"
                  placeholder="Chọn thông tin"
                  disabled={true}
                />
              </Form.Item>
              <Form.Item label="Giá gốc:" name="cost">
                <Input className="w-full" disabled={true} />
              </Form.Item>
              <Form.Item label="% khuyến mại:" name="discountPercent">
                <Input className="w-full" disabled={true} />
              </Form.Item>
              <Form.Item label="Số tiền:" name="discountCost">
                <Input className="w-full" disabled={true} />
              </Form.Item>
              <Form.Item label="Mô tả:" name="describe">
                <Input className="w-full" disabled={true} />
              </Form.Item>
              <UploadImg
                name={'files'}
                fileList={fileList}
                setFileList={setFileList}
                mode={mode}
              />
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
