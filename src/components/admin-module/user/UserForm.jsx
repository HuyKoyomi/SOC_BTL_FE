import UploadImg from '@components/admin-module/am.01-hotel_manager/am.01.02-create/views/UploadImg';
import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROLE_CONVERT } from 'src/constants/user';
import { useMainStore } from 'src/store/hook';
import { userActions } from 'src/store/reducer';

const required = {
  required: true,
  message: 'Trường thông tin không được phép để trống',
};

const UserForm = ({ mode = 'view' }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const common = UseCommon();
  const [{ userList }, dispatch] = useMainStore();
  const [dataDetail, setDataDetail] = useState({});
  const [currentMode, setCurrentMode] = useState(mode);

  const { id } = useParams();

  const axiosAPI = useAxiosAPI();

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/admin/user');
  };

  async function create() {
    try {
      common?.backdrop(true); // tạo spin quay
      let params = await form.getFieldsValue(true);
      await form.validateFields();

      const formData = new FormData();
      formData.append(
        'userRequest',
        JSON.stringify({
          id: dataDetail?.id,
          name: params.name,
          email: params.email,
          password: params.password,
          imageUrl: params.fileList,
          role: 'ADMIN',
        }),
      );

      formData.append('file', fileList);

      await axiosAPI.post('/admin/user/create', formData, {
        headers: {
          'Content-Type': 'form-data',
        },
      });

      handleGoBack();

      await common?.backdrop(false); // tạo spin quay
    } catch (error) {
      common?.backdrop(false); // tạo spin quay
    }
  }
  async function edit() {
    try {
      console.log('fileList: ', fileList);
      common?.backdrop(true); // tạo spin quay
      let params = await form.getFieldsValue(true);
      await form.validateFields();

      const formData = new FormData();
      formData.append(
        'userUpdateRequest',
        JSON.stringify({
          id: dataDetail?.id,
          name: params.name,
          password: params.password,
          role: 'ADMIN',
        }),
      );

      formData.append('file', fileList[0]);

      await axiosAPI.post('/user/update', formData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      handleGoBack();

      await common?.backdrop(false); // tạo spin quay
    } catch (error) {
      common?.backdrop(false); // tạo spin quay
    }
  }

  useEffect(() => {
    const getList = async (page = 0, pageSize = 1000000) => {
      try {
        common?.backdrop(true); // tạo spin quay
        const url = `/admin/user/search?page=${page}&size=${pageSize}`;
        const response = await axiosAPI.post(url, {
          name: null,
          email: null,
        });
        const { data } = response?.data || {};
        dispatch(userActions.setUserList(data.content));
        common?.backdrop(false);
      } catch (error) {
        common?.backdrop(false);

        console.log('error: ', error);
      }
    };
    getList();
  }, [id]);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  useEffect(() => {
    if (mode == 'view' || mode == 'edit') {
      form.setFieldsValue({
        name: dataDetail?.name,
        email: dataDetail?.email,
        password: dataDetail?.password,
        role: dataDetail?.role,
      });
      let arr = [
        {
          name: dataDetail?.imageUrl,
          url: dataDetail?.imageUrl,
        },
      ];
      setFileList(arr);
    }
  }, [dataDetail]);

  useEffect(() => {
    if (userList && userList.length > 0) {
      setDataDetail(userList.find((item) => item.id == id));
    }
  }, [userList, id]);

  return (
    <Card
      title={
        currentMode == 'create'
          ? 'Thêm mới người dùng'
          : currentMode == 'view'
          ? 'Xem chi tiết người dùng'
          : 'Chỉnh sửa người dùng'
      }
      actions={[
        <Button
          onClick={() => {
            console.log('back');
            if (currentMode == 'view' || currentMode == 'create') {
              handleGoBack();
            } else if (currentMode == 'edit') {
              handleGoBack();
              //   domain.goToViewPage();
            }
          }}
          key={1}
        >
          Quay lại
        </Button>,
        <Button
          className="text-cyan-1 bg-blue-6"
          onClick={() => {
            if (currentMode == 'view') {
              setCurrentMode('edit');
            } else if (currentMode == 'create') {
              create();
            } else if (currentMode === 'edit') {
              edit();
            }
          }}
          key={2}
        >
          {currentMode == 'create'
            ? 'Thêm mới'
            : currentMode == 'view'
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
            <Form.Item label="Họ tên:" name="name" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={currentMode == 'view'}
              />
            </Form.Item>
            <Form.Item label="Email:" name="email" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={currentMode == 'view'}
              />
            </Form.Item>

            {/* <Form.Item label="Mật khẩu:" name="password" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={currentMode == 'view' }
              />
            </Form.Item> */}

            <Form.Item label="Role:" name="role" rules={[required]}>
              <Select
                options={Object.values(ROLE_CONVERT).map((item) => ({
                  value: item,
                  label: item.charAt(0).toUpperCase() + item.slice(1),
                }))}
                className="w-full"
                allowClear={true}
                placeholder="Chọn role"
                disabled={currentMode == 'view'}
              />
            </Form.Item>

            <UploadImg
              name={'file'}
              fileList={fileList}
              setFileList={setFileList}
              mode={currentMode}
              disabled={currentMode == 'view'}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default UserForm;
