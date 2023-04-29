import { Button, Col, Form, Input, Row } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CM01LoginDomain from "../domains/LoginDomain";
import "./Login.less";

export function Login() {
  const [form] = Form.useForm();
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
  return (
    <div className="full-screen">
      <Row span={24}>
        <Col span={24} className="full-screen bg bg-cover">
          <div
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 25,
              width: "100%",
              textAlign: "center",
              marginTop: 30,
              marginBottom: 70,
            }}
          >
            HỆ THỐNG QUẢN LÝ KHÁCH SẠN
          </div>
          <Row span={24}>
            <Col span={6} />
            <Col span={12}>
              <Row span={24} className="py-7 bg-form">
                <Col span={5} />
                <Col span={14}>
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
                          message: "Tên đăng nhập không được phép để trống!",
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
                          message: "Mật khẩu không được phép để trống!",
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
                    <Form.Item>
                      <Link>Quên mật khẩu?</Link>
                    </Form.Item>
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col span={6} />
          </Row>
          <div
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 25,
              width: "100%",
              textAlign: "center",
              marginTop: 30,
              marginBottom: 30,
              float: "bottom",
              position: "absolute",
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
