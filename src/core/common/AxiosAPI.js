import axios from 'axios';
import queryString from 'query-string';
import { TIME_OUT } from './Contant';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:8080', //import.meta.env.REACT_APP_API_BACKEND,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

export default axiosAPI;
