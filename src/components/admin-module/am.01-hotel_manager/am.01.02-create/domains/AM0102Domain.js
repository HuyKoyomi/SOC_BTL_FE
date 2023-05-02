import useAxiosAPI from "@core/hooks/UseAxiosAPI";
import UseCommon from "@core/hooks/UseCommon";
import _ from "lodash";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import AM0102Service from "../services/AM0102Service";
import { message } from "antd";

export function AM0102Domain() {
  const [context, contextService] = AM0102Service();
  const contextRef = useRef(
    {
      listDataTable: null,
      listDataCount: null,
    } || context
  );
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI(); // khởi tạo biến call api

  const initDomain = async () => {
    // khởi tạo domain
    await contextService.initContext(contextRef.current);

    await getDataTable();
  };
  const getDataTable = async (params) => {
    try {
      common?.backdrop(true); // tạo spin quay
      const url = `/admin/hotel/create`;
      const response = await axiosAPI.post(url, params);
      const { code, data } = response?.data || {};
      if (code === 200 && data) {
        goToHomePage();
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
  //------------------- navigation ----------------------
  function goToHomePage() {
    navigate(`/admin/home`);
  }
  function goToCreatePage() {
    navigate(`/admin/home/create`);
  }
  const domainInterface = useRef({
    initDomain,
    getDataTable,
    goToHomePage,
    goToCreatePage,
  });
  return [context, domainInterface.current];
}

export default AM0102Domain;
