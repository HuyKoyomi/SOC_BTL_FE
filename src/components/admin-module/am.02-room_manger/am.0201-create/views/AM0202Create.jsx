import { ROOM_STATUS, SERVICE_LIST } from '@components/admin-module/Contant';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';
import UploadImg from './UploadImg';

export default function AM0202List({ context, domain }) {
  const [form] = Form.useForm();
  const { mode, dataDetail, listHotel, listRoomType } = context || {};
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

  return (
    <Card
      title={
        mode == 'create'
          ? 'Thêm mới phòng'
          : mode == 'view'
          ? 'Xem chi tiết phòng'
          : 'Chỉnh sửa phòng'
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
            if (mode == 'view') {
              domain.goToEditPage();
            } else if (mode == 'create') {
              create();
            } else if (mode == 'edit') {
              edit();
            }
          }}
          key={2}
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
            <Form.Item label="Loại phòng:" name="roomTypeId" rules={[required]}>
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
                disabled={mode == 'view' ? true : false}
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
  );
}
