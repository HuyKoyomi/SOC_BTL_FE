import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UM0201Service from '../services/UM0201Service';

export function UM0201Domain() {
  const [context, contextService] = UM0201Service();
  const contextRef = useRef(
    {
      listDataTable: null,
      listDataCount: null,
    } || context,
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);

    await getDataTable();
  };
  const getDataTable = async (
    page = 0,
    pageSize = 1000000,
    params = {
      userId: parseInt(sessionStorage.getItem('userId')),
    },
  ) => {
    try {
      common?.backdrop(true); // tạo spin quay
      const newParams = _.reduce(
        params,
        (result, value, key) => {
          return _.assign(result, {
            [key]: _.includes([NaN, null, undefined, ''], value) ? null : value,
          });
        },
        {},
      );
      const url = `/user/bookroom/list?page=${page}&size=${pageSize}`;
      const response = await axiosAPI.post(url, newParams);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        contextRef.current.listDataTable = data.content; //listData || [];
        contextRef.current.listDataCount = data.totalElements || 0;
        await contextService.updateContext(contextRef.current);
      }
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  //------------------- navigation ----------------------
  const goToViewPage = (id) => {
    navigate(`/user/home/view/${id}`);
  };
  const goToCreatePage = () => {
    navigate(`/user/home/${'create'}/${null}`);
  };

  const domainInterface = useRef({
    initDomain,
    getDataTable,
    goToViewPage,
    goToCreatePage,
  });
  return [context, domainInterface.current];
}

export default UM0201Domain;
