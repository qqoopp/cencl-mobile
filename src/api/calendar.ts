import {ClientAxiosResponse} from '@/../type';
import {AxiosResponse} from 'axios';
import {clientAxios} from './axiosInstance';
import {calendarAPI} from './url';

interface getCalendarParams {
  mem_id: string;
  start_date: string;
  end_date: string;
}

export const getCalendarFetch = ({mem_id, start_date, end_date}: getCalendarParams): Promise<AxiosResponse<ClientAxiosResponse<schedule[]>>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('start_date', start_date);
  form.append('end_date', end_date);

  return clientAxios.post(calendarAPI, form);
};
