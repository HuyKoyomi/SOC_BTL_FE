import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import CM01LoginDomain from '../domains/LoginDomain';
import './Login.less';

export function Login() {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const [context, domain] = CM01LoginDomain();

  useEffect(() => {
    domain.initDomain();
  }, []);

  async function onFinish() {
    let values = await form.getFieldsValue(true);
    await domain.getLogin({
      username: values?.username,
      password: values?.password,
    });
  }
  async function regist() {
    let values = await form1.getFieldsValue(true);
    if (values.password === values.re_password) {
      let res = await domain.regist({
        name: values?.name,
        email: values?.email,
        password: values?.password,
        role: 'USER',
      });
      console.log('res', res);
      if (res == true) {
        setLogin(true);
      }
    } else {
      message.error('Mật khẩu không trùng khớp');
    }
  }

  const [login, setLogin] = useState(true);

  return (
    <div className="full-screen">
      <Modal open={login} footer={null} closeIcon={null}>
        <Card
          title={
            <Row className="w-full justify-center">
              <div className="font-bold text-xl">Đăng nhập</div>
            </Row>
          }
        >
          <Form
            form={form}
            autoComplete="off"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label={<b>Tên đăng nhập</b>}
              name="username"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Tên đăng nhập không được phép để trống!',
                },
              ]}
            >
              <Input className="input-login" />
            </Form.Item>

            <Form.Item
              label={<b>Mật khẩu</b>}
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Mật khẩu không được phép để trống!',
                },
              ]}
            >
              <Input.Password className="input-login" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="input-button bg-blue-6"
              >
                Đăng nhập
              </Button>
            </Form.Item>

            <Row className="w-full justify-center">
              <Typography.Link
                className="ml-50"
                onClick={(e) => setLogin(!login)}
              >
                Đăng ký tài khoản
              </Typography.Link>
            </Row>
          </Form>
        </Card>
      </Modal>
      <Modal open={!login} footer={null}>
        <Card
          title={
            <Row className="w-full justify-center">
              <div className="font-bold text-xl">Đăng ký tài khoản</div>
            </Row>
          }
        >
          <Form
            form={form1}
            autoComplete="off"
            onFinish={regist}
            layout="vertical"
          >
            <Form.Item
              label={<b>Họ và Tên</b>}
              name="name"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Tên thông tin không được phép để trống!',
                },
              ]}
            >
              <Input className="input-login" />
            </Form.Item>
            <Form.Item
              label={<b>Tên đăng nhập/ Email</b>}
              name="email"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Tên thông không được phép để trống!',
                },
              ]}
            >
              <Input className="input-login" />
            </Form.Item>

            <Form.Item
              label={<b>Mật khẩu</b>}
              name="password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Trường thông tin không được phép để trống!',
                },
              ]}
            >
              <Input.Password className="input-login" />
            </Form.Item>
            <Form.Item
              label={<b>Xác nhân mật khẩu</b>}
              name="re_password"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Trường thông tin không được phép để trống!',
                },
              ]}
            >
              <Input.Password className="input-login" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="input-button bg-blue-6"
              >
                Đăng ký tài khoản
              </Button>
            </Form.Item>

            <Row className="w-full justify-center">
              <Typography.Link
                className="ml-50"
                onClick={(e) => setLogin(!login)}
              >
                Đăng nhập
              </Typography.Link>
            </Row>
          </Form>
        </Card>
      </Modal>
      <Row span={24}>
        <Col span={24} className="full-screen bg bg-cover">
          <div
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 25,
              width: '100%',
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 70,
            }}
          >
            HỆ THỐNG QUẢN LÝ KHÁCH SẠN
          </div>
          <Row span={24}>
            <Col span={6} />
            <Col span={12}></Col>
            <Col span={6} />
          </Row>
          <div
            style={{
              color: 'white',
              fontWeight: '500',
              fontSize: 25,
              width: '100%',
              textAlign: 'center',
              marginTop: 30,
              marginBottom: 30,
              float: 'bottom',
              position: 'absolute',
              bottom: 0,
            }}
          >
            PHÁT TRIỂN PHẦN MỀM HƯỚNG DỊCH VỤ
          </div>
        </Col>
        {/* --------------------------------------- */}
      </Row>
    </div>
  );
}
