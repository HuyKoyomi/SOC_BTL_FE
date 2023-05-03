import { HOTEL_STATUS } from '@components/admin-module/Contant';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import UploadImg from './UploadImg';

export default function AM0102List({ context, domain }) {
  const [form] = Form.useForm();

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

  return (
    <Card
      title="Thêm mới khách sạn"
      actions={[
        <Button
          onClick={(e) => {
            domain.goToHomePage();
          }}
          key={1}
        >
          Quay lại
        </Button>,
        <Button
          className="text-cyan-1 bg-blue-6"
          onClick={(e) => {
            create();
          }}
          key={2}
        >
          Thêm mới
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
              />
            </Form.Item>
            <Form.Item label="Trạng thái:" name="status" rules={[required]}>
              <Select
                options={HOTEL_STATUS}
                className="w-full"
                allowClear={true}
                placeholder="Chọn thông tin"
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
              />
            </Form.Item>
            <Form.Item label="Mô tả:" name="describe" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
              />
            </Form.Item>
            <Form.Item label="Địa chỉ" name="address" rules={[required]}>
              <Input.TextArea
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
              />
            </Form.Item>
            <UploadImg name={'files'} />
          </Col>
        </Row>
      </Form>
    </Card>
  );
}
