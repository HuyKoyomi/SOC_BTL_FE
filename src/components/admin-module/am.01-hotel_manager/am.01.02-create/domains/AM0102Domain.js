import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AM0102Service from '../services/AM0102Service';
import { message } from 'antd';

export function AM0102Domain() {
  const [context, contextService] = AM0102Service();
  const contextRef = useRef({} || context);
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);

    // await getDataTable();
  };
  // const getDataTable = async (params) => {
  //   try {
  //     common?.backdrop(true); // tạo spin quay
  //     const url = `/admin/hotel/create`;
  //     const response = await axiosAPI.post(url, params);
  //     const { code, data } = response?.data || {};
  //     if (code === 200 && data) {
  //       goToHomePage();
  //     } else {
  //       message.error(response.data.message);
  //     }
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     common?.backdrop(false);
  //   }
  // };

  const create = async (params) => {
    try {
      common?.backdrop(true); // tạo spin quay
      let dataTMP = {
        nameHotel: params?.nameHotel,
        address: params?.address,
        status: params?.status,
        describe: params?.describe,
        telephoneContact: params?.telephoneContact,
        numberBankAccount: params?.numberBankAccount,
        nameBankAccount: params?.nameBankAccount,
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
      const url = `/admin/hotel/create`;
      const response = await axiosAPI.post(url, formData, {
        //sử dụng trong TH dùng form-data + multipart
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // const { code, data } = response?.data || {};
      if (response?.status === 200) {
        message.success('Thêm mới thành công');
        goToHomePage();
      } else {
        message.error('Thêm mới thất bại');
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  //------------------- navigation ----------------------
  async function goToHomePage() {
    await navigate(`/admin/home`);
  }
  async function goToCreatePage() {
    await navigate(`/admin/home/create`);
  }
  const domainInterface = useRef({
    initDomain,
    getDataTable,
    goToHomePage,
    goToCreatePage,
    create,
  });
  return [context, domainInterface.current];
}

export default AM0102Domain;
