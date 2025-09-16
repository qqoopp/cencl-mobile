import {resetNavigation} from '@/utils/rootNavigations';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';
import CONFIG from 'react-native-config';

console.log(CONFIG);

export const clientAxios = axios.create({
  baseURL: CONFIG.BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

clientAxios.interceptors.request.use(
  function (config) {
    console.log('url [', config.url, ']');
    console.log('params [', config.params, ']');
    console.log('form [', config.data, ']');
    console.log('method [', config.method, ']');
    return config;
  },
  function (error) {
    console.log('error heck');
    console.error(error);
    console.log(error.response);
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  },
);

clientAxios.interceptors.response.use(
  function (res) {
    try {
      //   console.log('-------------------res-------------------');
      //   console.log(res);
      //   console.log('-------------------end-------------------');
      if (res.data.state === 'success') {
        return res;
      } else {
        switch (res.data.statusCode) {
          default:
            return res;
        }
      }
    } catch (error) {
      console.error(error);
    }
  },
  function (error) {
    console.log(error);
    console.log(error.response);

    console.error(error);
  },
);
