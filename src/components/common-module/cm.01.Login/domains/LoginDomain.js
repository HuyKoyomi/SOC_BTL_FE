import { message } from 'antd';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService';
import UseCommon from '@core/hooks/UseCommon';
import useAxiosAPI from '@core/hooks/UseAxiosAPI';
import { ROLE_CONVERT } from '../views/Contant';
import axios from 'axios';

export function CM01LoginDomain() {
  const [context, contextService] = LoginService();
  const contextRef = useRef(context);
  const navigate = useNavigate();
  const common = UseCommon();
  const axiosAPI = useAxiosAPI();

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
      const url = `/auth/login`;
      const response = await axiosAPI.post(url, {
        email: username,
        password: password,
      });
      const { accessToken } = response?.data || {};
      if (accessToken) {
        sessionStorage.setItem('access_token', accessToken);
        message.success('Đăng nhập thành công');
        await getUserLogin();
      }
      // else {
      //   message.error('Tên đăng nhập hoặc mật khẩu không chính xác');
      // }
    } catch (error) {
      console.log(error);
      message.error('Tên đăng nhập hoặc mật khẩu không chính xác');
    } finally {
      common?.backdrop(false);
    }
  };
  async function getUserLogin() {
    const url = `/user/me`;

    try {
      common?.backdrop(true);
      localStorage.clear();
      const response = await axiosAPI.get(url);
      let { data, code } = response?.data || {};
      if (code == 200 && data) {
        sessionStorage.setItem('role', data?.role);
        sessionStorage.setItem('userId', data?.id);
        switch (data?.role) {
          case ROLE_CONVERT.USER:
            navigate('/user/home');
            break;
          case ROLE_CONVERT.ADMIN:
            navigate('/admin/home');
            break;
          default:
            localStorage.clear();
            break;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      common?.backdrop(false);
    }
  }
  //------------------- navigation ----------------------
  async function regist({ name, email, password, role }) {
    try {
      common?.backdrop(true);
      const url = `http://localhost:8080/auth/signup`;
      let dataIp = {
        name: name,
        email: email,
        password: password,
        role: role,
      };
      await axios({
        method: 'post',
        url: url,
        data: dataIp,
      }).then((res) => {
        console.log(res.data, 'res');
        if (res?.data.success) {
          message.success('Đăng ký thành công');
        }
      });
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      common?.backdrop(false);
    }
    return true;
  }
  const domainInterface = useRef({
    initDomain,
    getLogin,
    regist,
  });
  return [context, domainInterface.current];
}

export default CM01LoginDomain;
