import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import { message } from 'antd';
import dayjs from 'dayjs';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UM0102Service from '../services/UM0102Service';

export function UM0102Domain() {
  const { mode, id } = useParams();
  const [context, contextService] = UM0102Service();
  const contextRef = useRef(
    {
      dataDetail: {},
      mode: mode,
    } || context,
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);
    if (mode == 'view') {
      await getDataDetail();
    }
  };
  const getDataDetail = async () => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/user/room/detail?id=${id}`;
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

  const create = async (params) => {
    try {
      common?.backdrop(true); // tạo spin quay
      let checkInTime = new Date(
        dayjs(params?.checkInTime).format('YYYY-MM-DD HH:mm:ss'),
      ).toISOString();
      let checkOutTime = new Date(
        dayjs(params?.checkOutTime).format('YYYY-MM-DD HH:mm:ss'),
      ).toISOString();

      let dataTMP = {
        rentalPeriod: params?.rentalPeriod,
        userNameDirectBooking: params?.userNameDirectBooking,
        roomId: params?.roomId,
        userId: params?.userId,
        directBooking: params?.directBooking,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        deposit: params?.deposit,
      };
      console.log('dataTMP', dataTMP);
      const url = `/user/bookroom/create`;
      const response = await axiosAPI.post(url, dataTMP);
      if (response?.data?.code == 200) {
        message.success('Đặt phòng thành công');
        goToHomePage();
      } else {
        message.error('Đặt phòng thất bại');
      }
      // return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  //------------------- navigation ----------------------
  function goToHomePage() {
    navigate(`/user/home`);
  }
  function goBack() {
    navigate(-1);
  }
  const domainInterface = useRef({
    initDomain,
    goToHomePage,
    goBack,
    create,
  });
  return [context, domainInterface.current];
}

export default UM0102Domain;
