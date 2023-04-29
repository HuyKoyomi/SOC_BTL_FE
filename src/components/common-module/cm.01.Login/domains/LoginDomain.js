import { useRef, useEffect } from "react";
import LoginService from "../services/LoginService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { AxiosAPI } from "@core/common/AxiosAPI";
import UseCommon from "@core/hooks/UseCommon";

export function CM01LoginDomain() {
  const [context, contextService] = LoginService();
  const contextRef = useRef(context);
  const navigate = useNavigate();
  const common = UseCommon();

  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const initDomain = async () => {
    const contextData = {};
    await contextService.initContext(contextData);
  };
  const getLogin = async ({ username, password }) => {
    try {
      common?.backdrop(true);
      let response = await AxiosAPI({
        method: "get",
        url:
          process.env.REACT_APP_API_URL +
          `/userLogin?username=${username}&password=${password}`,
        data: null,
      });

      if (response == true) {
        message.success("Đăng nhập thành công");
        goToHomePage();
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không chính xác");
      }
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  };
  //------------------- navigation ----------------------
  function goToHomePage() {
    navigate("/home");
  }
  const domainInterface = useRef({
    initDomain,
    getLogin,
  });
  return [context, domainInterface.current];
}

export default CM01LoginDomain;
