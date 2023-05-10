import UploadImg from '@components/admin-module/am.01-hotel_manager/am.01.02-create/views/UploadImg';
import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { Button, Card, Col, Form, Input, Row, Select } from 'antd';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUpdateEffect } from 'react-use';

const required = {
  required: true,
  message: 'Trường thông tin không được phép để trống',
};

const CreateRoomPage = () => {
  const [form] = Form.useForm();
  const dataDetail = {};
  const [listHotel, setListHotel] = useState([]);
  const [fileList, setFileList] = useState([]);
  const common = UseCommon();

  const axiosAPI = useAxiosAPI();

  const mode = 'create';
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/admin/room');
  };

  useUpdateEffect(() => {
    if (mode == 'view' || mode == 'edit') {
      const { hotel, imageStoreLink } = dataDetail || {};
      form.setFieldsValue({
        numberRoom: hotel?.numberRoom,
        describe: hotel?.describe,
        floor: hotel?.floor,
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
    }
  }, [dataDetail]);

  async function create() {
    try {
      common?.backdrop(true); // tạo spin quay
      let params = await form.getFieldsValue(true);
      await form.validateFields();

      const formData = new FormData();
      formData.append(
        'roomRequest',
        JSON.stringify({
          hotelId: params.hotelId,
          roomTypeId: [1, 2],
          floor: params.floor,
          numberRoom: params.numberRoom,
          status: 0,
          cost: params.cost,
          discountPercent: 0.1,
          discountCost: 999999,
          describe: params.describe,
          service: [],
        }),
      );

      formData.append('files', fileList);

      await axiosAPI.post('/admin/room/create', formData, {
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
    // let params = await form.getFieldsValue(true);
    // console.log('params', params);
    // await form.validateFields();
    // await domain.edit(params);
  }

  useEffect(() => {
    const getList = async (page = 0, pageSize = 1000000) => {
      try {
        common?.backdrop(true); // tạo spin quay
        const url = `/admin/hotel/search?page=${page}&size=${pageSize}`;
        const response = await axiosAPI.post(url, {
          hotelId: null,
          roomTypeId: null,
          costFrom: null,
          costTo: null,
          floor: null,
        });
        const { data } = response?.data || {};
        setListHotel(data.content);
        common?.backdrop(false);
      } catch (error) {
        common?.backdrop(false);

        console.log('error: ', error);
      }
    };
    getList();
  }, []);

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
          onClick={() => {
            console.log('back');
            if (mode == 'view' || mode == 'create') {
              handleGoBack();
            } else if (mode == 'edit') {
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
            if (mode == 'view') {
              handleGoBack();
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
            <Form.Item label="Hotel:" name="hotelId" rules={[required]}>
              <Select
                options={listHotel.map((item) => ({
                  value: item.hotel.id,
                  label: item.hotel.nameHotel,
                }))}
                className="w-full"
                allowClear={true}
                placeholder="Chọn khách sạn"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            <Form.Item label="Số phòng:" name="numberRoom" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            <Form.Item label="Tầng:" name="floor" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>

            <Form.Item label="Giá" name="cost" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>

            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item label="Mô tả:" name="describe" rules={[required]}>
              <Input
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item>
            {/* <Form.Item label="Địa chỉ" name="address" rules={[required]}>
              <Input.TextArea
                className="w-full"
                allowClear={true}
                placeholder="Nhập thông tin"
                disabled={mode == 'view' ? true : false}
              />
            </Form.Item> */}
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
};

export default CreateRoomPage;
