import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import UseCommon from '@core/hooks/UseCommon';
import _ from 'lodash';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AM0101Service from '../services/AM0101Service';

export function AM0101Domain() {
  const [context, contextService] = AM0101Service();
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
      hotelName: null,
      address: null,
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
      const url = `/admin/hotel/search?page=${page}&size=${pageSize}`;
      const response = await axiosAPI.post(url, newParams);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        let listData = [];
        _.map(data.content, (item, index) => {
          listData.push(item.hotel);
        });
        contextRef.current.listDataTable = listData || [];
        contextRef.current.listDataCount = data.totalElements || 0;
        // update lại giá trị
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
    navigate(`/admin/home/view/${id}`);
  };
  const goToCreatePage = () => {
    navigate(`/admin/home/${'create'}/${null}`);
  };

  const domainInterface = useRef({
    initDomain,
    getDataTable,
    goToViewPage,
    goToCreatePage,
  });
  return [context, domainInterface.current];
}

export default AM0101Domain;
