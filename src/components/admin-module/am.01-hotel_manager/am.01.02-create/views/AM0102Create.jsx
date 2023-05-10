import { HOTEL_STATUS } from '@components/admin-module/Contant';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { useUpdateEffect } from 'react-use';
import UploadImg from './UploadImg';
import { useState } from 'react';
import _ from 'lodash';

export default function AM0102List({ context, domain }) {
  const [form] = Form.useForm();
  const { mode, dataDetail } = context || {};
  const [fileList, setFileList] = useState([]);
  useUpdateEffect(() => {
    if (mode == 'view' || mode == 'edit') {
      const { hotel, imageStoreLink } = dataDetail || {};
      form.setFieldsValue({
        nameHotel: hotel?.nameHotel,
        address: hotel?.address,
        describe: hotel?.describe,
        nameBankAccount: hotel?.nameBankAccount,
        numberBankAccount: hotel?.numberBankAccount,
        status: hotel?.status,
        telephoneContact: hotel?.telephoneContact,
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

  console.log('fileList', fileList);

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
          ? 'Thêm mới khách sạn'
          : mode == 'view'
          ? 'Xem chi tiết khách sạn'
          : 'Chỉnh sửa khách sạn'
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
              label="Tên khách sạn:"
              name="nameHotel"
              rules={[required]}
            >
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Số điện thoại liên lạc:"
              name="telephoneContact"
              rules={[required]}
            >
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            <Form.Item label="Trạng thái:" name="status" rules={[required]}>
              <Select
                options={HOTEL_STATUS}
                className="w-full"
                allowClear={true}
                placeholder="Chọn thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Số tài khoản admin"
              name="numberBankAccount"
              rules={[required]}
            >
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            <Form.Item
              label="Tên tài khoản admin"
              name="nameBankAccount"
              rules={[required]}
            >
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
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
            <Form.Item label="Địa chỉ" name="address" rules={[required]}>
              <Input.TextArea
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
