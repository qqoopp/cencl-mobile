import {ClientAxiosResponse} from '@/../type';
import {AxiosResponse} from 'axios';
import {clientAxios} from './axiosInstance';
import {alarmAPI, noticeAPI} from './url';

interface getNoticesParams {
  mem_id: string;
  start_date: string;
  end_date: string;
  [key: string]: string;
}

export const getNoticesFetch = (params: getNoticesParams): Promise<AxiosResponse<ClientAxiosResponse<notice[]>>> => {
  const form = new FormData();

  for (const key in params) {
    form.append(key, params[key]);
  }

  return clientAxios.post(noticeAPI, form);
};

interface getAlarmParams {
  mem_id: string;
  start_date: string;
  end_date: string;
  [key: string]: string;
}

export const getAlarmFetch = (params: getAlarmParams): Promise<AxiosResponse<ClientAxiosResponse<alarm[]>>> => {
  const form = new FormData();
  for (const key in params) {
    form.append(key, params[key]);
  }

  return clientAxios.post(alarmAPI, form);
};
