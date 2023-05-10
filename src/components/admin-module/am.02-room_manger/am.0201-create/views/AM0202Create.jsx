import { ROOM_STATUS, SERVICE_LIST } from '@components/admin-module/Contant';
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
  Tag,
} from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useUpdateEffect } from 'react-use';
import UploadImg from './UploadImg';
import { formatCurrency } from '@common/Utils';

export default function AM0202List({ context, domain }) {
  const [form] = Form.useForm();
  const { mode, dataDetail, listHotel, listRoomType, totalCost } =
    context || {};
  const [fileList, setFileList] = useState([]);
  useUpdateEffect(() => {
    if (mode == 'view' || mode == 'edit') {
      const { roomResponse, imageStoreLink } = dataDetail || {};
      let roomTypeId = [];
      _.map(roomResponse?.roomType, (item) => {
        roomTypeId.push(item?.id);
      });
      form.setFieldsValue({
        hotelId: roomResponse?.hotelId,
        roomTypeId: roomTypeId,
        floor: roomResponse?.floor,
        numberRoom: roomResponse?.numberRoom,
        status: roomResponse?.status,
        cost: roomResponse?.cost,
        discountPercent: roomResponse?.discountPercent,
        discountCost: roomResponse?.discountCost,
        describe: roomResponse?.describe,
        service: [1, 2], //roomResponse?.service,
        files: imageStoreLink,
      });
      let arr = [];
      _.map(imageStoreLink, (item, index) => {
        arr.push({
          uid: item?.id,
          name: item?.fileName,
          status: 'done',
          url: item?.fileUrl,
        });
      });
      setFileList(arr);
    }
  }, [dataDetail]);
  useEffect(() => {
    form.setFieldsValue({
      status: 0,
    });
    form1.setFieldsValue({
      directBooking: true,
    });
  }, []);
  const required = {
    required: true,
    message: 'Trường thông tin không được phép để trống',
  };

  async function create() {
    let params = await form.getFieldsValue(true);
    console.log('params', params);
    await form.validateFields();
    await domain.create(params);
  }
  async function edit() {
    let params = await form.getFieldsValue(true);
    console.log('params', params);
    await form.validateFields();
    await domain.edit(params);
  }

  const [form1] = Form.useForm();
  const [open, setOpen] = useState(false);
  const modalHandle = async () => {
    setOpen(!open);
  };
  async function checkin() {
    await form1.validateFields();
    let params = await form1.getFieldsValue(true);
    params.roomId = dataDetail?.roomResponse.id;
    // params.userId = parseInt(sessionStorage.getItem('userId'));
    console.log('params', params);
    await domain.checkin(params);
  }
  const [openTotal, setOpenTotal] = useState(false);
  async function checkout() {
    await domain.checkout();
    setOpenTotal(true);
  }
  return (
    <>
      <Modal
        open={openTotal}
        onCancel={(e) => setOpenTotal(false)}
        footer={null}
      >
        <Row className="w-full flex justify-center">
          <Tag color="green" className=" text-lg">
            Tổng tiền:{' '}
            <tag className="font-bold">{formatCurrency(totalCost)}</tag> đồng
          </Tag>
        </Row>
      </Modal>
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
            onClick={(e) => checkin()}
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
        title={
          mode == 'create'
            ? 'Thêm mới phòng'
            : mode == 'view'
            ? 'Xem chi tiết phòng'
            : 'Chỉnh sửa phòng'
        }
        extra={
          <>
            {dataDetail?.roomResponse?.status == 0 && (
              <Button
                className="text-cyan-1 bg-blue-6"
                onClick={(e) => {
                  setOpen(true);
                }}
                key={2}
                hidden={mode == 'view' ? false : true}
              >
                Check in
              </Button>
            )}
            {dataDetail?.roomResponse?.status == 1 && (
              <Button
                className="text-cyan-1 bg-blue-6"
                key={2}
                hidden={mode == 'view' ? false : true}
                onClick={(e) => checkout()}
              >
                Check out
              </Button>
            )}
          </>
        }
        actions={[
          <Button
            onClick={(e) => {
              if (mode == 'view' || mode == 'create') {
                domain.goBack();
              } else if (mode == 'edit') {
                domain.goToViewPage();
              }
            }}
            key={1}
          >
            Quay lại
          </Button>,
          <Button
            className="text-cyan-1 bg-blue-6"
            onClick={(e) => {
              if (mode == 'create') {
                create();
              } else if (mode == 'view') {
                domain.goToEditPage();
              } else if (mode == 'edit') {
                edit();
              }
            }}
            key={2}
            hidden={mode == 'create' ? false : true}
          >
            {mode == 'create'
              ? 'Thêm mới'
              : mode == 'view'
              ? 'Chỉnh sửa'
              : 'Xác nhận chỉnh sửa'}
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
              <Form.Item
                label="Khách sạn:"
                name="hotelId"
                rules={[required]}
                hidden={mode == 'create' ? false : true}
              >
                <Select
                  options={_.map(listHotel, (item) => ({
                    value: item?.hotel?.id,
                    label: item?.hotel?.nameHotel,
                  }))}
                  className="w-full"
                  allowClear={true}
                  placeholder="Chọn khách sạn"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item
                label="Loại phòng:"
                name="roomTypeId"
                rules={[required]}
              >
                <Select
                  options={_.map(listRoomType, (item) => ({
                    value: item?.id,
                    label: item?.nameRoomType,
                  }))}
                  mode="multiple"
                  className="w-full"
                  allowClear={true}
                  placeholder="Chọn thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item label="Số phòng:" name="numberRoom" rules={[required]}>
                <InputNumber
                  min={0}
                  className="w-full"
                  allowClear={true}
                  placeholder="Nhập thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item label="Tầng:" name="floor" rules={[required]}>
                <InputNumber
                  min={0}
                  className="w-full"
                  allowClear={true}
                  placeholder="Nhập thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item label="Giá gốc" name="cost" rules={[required]}>
                <InputNumber
                  className="w-full"
                  allowClear={true}
                  placeholder="Nhập thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item
                label="% khuyễn mại"
                name="discountPercent"
                rules={[required]}
              >
                <InputNumber
                  className="w-full"
                  allowClear={true}
                  placeholder="Nhập thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item
                label="Giá còn lại"
                name="discountCost"
                rules={[required]}
              >
                <InputNumber
                  className="w-full"
                  allowClear={true}
                  placeholder="Nhập thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item label="Trạng thái:" name="status" rules={[required]}>
                <Select
                  options={ROOM_STATUS}
                  className="w-full"
                  allowClear={true}
                  placeholder="Chọn thông tin"
                  // disabled={mode == 'view' ? true : false}
                  disabled={true}
                />
              </Form.Item>
              <Form.Item label="Dịch vụ:" name="service" rules={[required]}>
                <Select
                  options={SERVICE_LIST}
                  mode="multiple"
                  className="w-full"
                  allowClear={true}
                  placeholder="Chọn thông tin"
                  disabled={mode == 'view' ? true : false}
                />
              </Form.Item>
              <Form.Item label="Mô tả:" name="describe" rules={[required]}>
                <Input
                  className="w-full"
                  allowClear={true}
                  placeholder="Nhập thông tin"
                  disabled={mode == 'view' ? true : false}
                />
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
