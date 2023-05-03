import axiosAPI from '@core/common/AxiosAPI';
import { message } from 'antd';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UseCommon from './UseCommon';
import useRefreshToken from './UseRefreshToken';

const useAxiosAPI = () => {
  const navigate = useNavigate();
  const refreshToken = useRefreshToken();
  const common = UseCommon();

  useEffect(() => {
    const requestInterceptor = axiosAPI.interceptors.request.use(
      (config) => {
        console.log('call api');
        checkHistoryURL();
        // Thêm headers
        if (!config.headers) {
          config.headers = {};
        }
        // Thêm xác thực
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${
            sessionStorage[`access_token`]
          }`;
        }
        // Thêm ngôn ngữ
        // config.headers["Accept-Language"] = language;
        // Xử lý data trong body (PUT, PATCH, POST,...) là 1 object, kích thước > 0
        if (
          config.data &&
          _.isPlainObject(config.data) &&
          _.size(config.data)
        ) {
          const data = config.data;
          // Trim data
          config.data = _.reduce(
            data,
            (result, value, key) => {
              return _.assign(result, {
                [key]: value && _.isString(value) ? value.trim() : value,
              });
            },
            {},
          );
        }
        // Cookie
        config.withCredentials = true;
        config.maxContentLength = 100000000;
        config.maxBodyLength = 1000000000;
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseInterceptor = axiosAPI.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        // Kiểm tra hết hạn phiên đăng nhập
        let isExpToken = checkExpiredToken();
        if (isExpToken) {
          // Kiểm tra - lấy lại Refresh Token
          console.log('400 refresh token::');
          // Dùng refresh token để lấy access token
          if (!prevRequest?.sent) {
            prevRequest.sent = true;
            try {
              const newAccessToken = await refreshToken();
              prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            } catch (error) {
              console.log(error, 'error');
            }
            return axiosAPI(prevRequest);
          }
          // Refresh token hết hạn
          message.info('Phiên đăng nhập đã hết hạn');
          common?.backdrop(false);
          sessionStorage.clear();
          return navigate('/');
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosAPI.interceptors.request.eject(requestInterceptor);
      axiosAPI.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  function checkHistoryURL() {
    // nếu chưa có accessToken là chưa đăng nhập -> bắt đăng nhập
    // đăng nhập xong sẽ điều hướng về trang cũ
    let accessToken = sessionStorage.getItem('access_token');
    if (!accessToken) {
      if (window.location.pathname !== '/') {
        let params = getAllUrlParams(window.location.href);
        sessionStorage.setItem('prev_url', window.location.pathname);
        sessionStorage.setItem('telegram_type', params?.telegramType);
        window.location.assign('http://localhost:8080');
      }
    }
  }
  function checkExpiredToken() {
    // Lấy token decode kiểm tra expired chưa
    let accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      const decodedToken = jwt_decode(accessToken);
      // Kiểm tra token có còn hạn không - so với ngày hiện tại
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        return true;
      }
    }
    return false;
  }

  return axiosAPI;
};
export default useAxiosAPI;

function getAllUrlParams(url) {
  console.log('url', url);
  // get query string from url (optional) or window
  let queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  let obj = {};

  // if query string exists
  if (queryString) {
    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    let arr = queryString.split('&');

    for (const element of arr) {
      // separate the keys and the values
      let a = element.split('=');

      // set parameter name and value (use 'true' if empty)
      let paramName = a[0];
      let paramValue = typeof a[1] === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      //   paramName = paramName.toLowerCase();
      //   if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {
        // create key if it doesn't exist
        let key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) {
          obj[key] = [];
        }

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          let index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
