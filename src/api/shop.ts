import {ClientAxiosResponse} from '@/../type';
import {AxiosResponse} from 'axios';
import {UseQueryResult} from 'react-query';
import {clientAxios} from './axiosInstance';
import {campusListUrl, loginUrl} from './url';

interface campus {
  shop_addr: string;
  shop_code: string;
  shop_name: string;
  shop_tel: string;
}

export const campusListFetch = (): Promise<
  UseQueryResult<AxiosResponse<ClientAxiosResponse<campus[]>>>
> => {
  return clientAxios.get(campusListUrl);
};
