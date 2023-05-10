import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AM0202Service from '../services/AM0202Service';
import { message } from 'antd';

export function AM0202Domain() {
  const { mode, id } = useParams();
  const [context, contextService] = AM0202Service();
  const contextRef = useRef(
    {
      dataDetail: {},
      listHotel: [],
      listRoomType: [],
      mode: mode,
    } || context,
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);
    await getListHotel();
    await getListRoomType();
    if (mode == 'view') {
      await getDataDetail();
    }
  };
  const getDataDetail = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/admin/room/detail?id=${id}`;
      const response = await axiosAPI.get(url);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.dataDetail = data;
        await contextService.updateContext(contextRef.current);
      } else {
        message.error(response.data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const getListHotel = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/admin/hotel/search?page=0&size=1000000`;
      const response = await axiosAPI.post(url, {
        hotelId: null,
        roomTypeId: null,
        costFrom: null,
        costTo: null,
        floor: null,
      });
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listHotel = data.content;
        await contextService.updateContext(contextRef.current);
      } else {
        message.error(response.data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const getListRoomType = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/admin/room-type?page=0&size=1000000`;
      const response = await axiosAPI.get(url);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listRoomType = data;
        await contextService.updateContext(contextRef.current);
      } else {
        message.error(response.data.message);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const create = async (params) => {
    try {
      common?.backdrop(true); // tạo spin quay
      let dataTMP = {
        hotelId: params?.hotelId,
        roomTypeId: params?.roomTypeId,
        floor: params?.floor,
        numberRoom: params?.numberRoom,
        status: params?.status,
        cost: params?.cost,
        discountPercent: params?.discountPercent,
        discountCost: params?.discountCost,
        describe: params?.describe,
        service: params?.service,
      };
      console.log('dataTMP', dataTMP);
      const formData = new FormData();
      formData.append('roomRequest', JSON.stringify(dataTMP));
      let listFile = params?.files || [];
      if (listFile && listFile?.length !== 0) {
        _.map(listFile, (item) => {
          formData.append('files', item);
        });
      } else {
        formData.append('files', null);
      }
      const url = `/admin/room/create`;
      const response = await axiosAPI.post(url, formData, {
        //sử dụng trong TH dùng form-data + multipart
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.status === 200) {
        message.success('Thêm mới thành công');
        goToHomePage();
      } else {
        message.error('Thêm mới thất bại');
      }
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  const edit = async (params) => {
    try {
      common?.backdrop(true); // tạo spin quay
      let dataTMP = {
        id: parseInt(id),
        nameHotel: params?.nameHotel,
        address: params?.address,
        status: params?.status,
        describe: params?.describe,
        telephoneContact: params?.telephoneContact,
        numberBankAccount: params?.numberBankAccount,
        nameBankAccount: params?.nameBankAccount,
        imgDelete: [],
      };
      console.log('dataTMP', dataTMP);
      const formData = new FormData();
      formData.append('hotelRequest', JSON.stringify(dataTMP));
      let listFile = params?.files || [];
      if (listFile && listFile?.length !== 0) {
        _.map(listFile, (item) => {
          formData.append('files', item);
        });
      } else {
        formData.append('files', null);
      }
      const url = `/admin/hotel/update`;
      const response = await axiosAPI.post(url, formData, {
        //sử dụng trong TH dùng form-data + multipart
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response?.status === 200) {
        message.success('Cập nhật thành công');
        goToHomePage();
      } else {
        message.error('Cập nhật thất bại');
      }
      return data;
    } catch (error) {
      console.log(error);
      message.error('Cập nhật thất bại');
    } finally {
      common?.backdrop(false);
    }
  };
  async function goToEditPage() {
    contextRef.current.mode = 'edit';
    await contextService.updateContext(contextRef.current);
  }
  async function goToViewPage() {
    contextRef.current.mode = 'view';
    await contextService.updateContext(contextRef.current);
  }
  //------------------- navigation ----------------------
  function goToHomePage() {
    navigate(`/admin/room`);
  }
  function goBack() {
    navigate(-1);
  }
  const domainInterface = useRef({
    initDomain,
    goToHomePage,
    goToEditPage,
    goToViewPage,
    goBack,
    create,
    edit,
  });
  return [context, domainInterface.current];
}

export default AM0202Domain;
