import {ClientAxiosResponse, StyledTheme} from '@/../type';
import {AxiosResponse} from 'axios';
import {clientAxios} from './axiosInstance';
import {
  chatListAPI,
  growthListAPI,
  pointListAPI,
  readingListAPI,
  replyAPI,
  reportAPI,
  rftListAPI,
  sendChatAPI,
  speakingListAPI,
  srtestListAPI,
  vocaTestListAPI,
  writingListAPI,
} from './url';
import {getFormDataFromParams} from '@/utils/getFormDataFromParams';

interface getListByDateParams {
  mem_id: string;
  start_date: string;
  end_date: string;
  [key: string]: string;
}

export const readingListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<reading[]>>> => {
  const form = getFormDataFromParams(params);
  return clientAxios.post(readingListAPI, form);
};
export const speakingListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<speaking[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(speakingListAPI, form);
};
export const writingListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<writing[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(writingListAPI, form);
};

export const rftListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<rft[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(rftListAPI, form);
};

export const vocaListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(vocaTestListAPI, form);
};

export const srtestListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<srtest[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(srtestListAPI, form);
};

export const pointListFetch = (params: {mem_id: string}): Promise<AxiosResponse<ClientAxiosResponse<pointHistory[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(pointListAPI, form);
};

interface getReportProps {
  mem_id: string;
  month: string;
  sDay: string;
  eDay: string;
  [key: string]: string;
}

export const getReportFetch = (params: getReportProps): Promise<AxiosResponse<ClientAxiosResponse<report[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(reportAPI, form);
};

interface sendMsgParams {
  mem_id: string;
  content: string;
  [key: string]: string;
}

export const sendChatFetch = (params: sendMsgParams) => {
  const form = getFormDataFromParams(params);
  form.append('cmd', 'add');

  return clientAxios.post(sendChatAPI, form);
};

export const chatListFetch = ({mem_id}: {mem_id: string}): Promise<AxiosResponse<ClientAxiosResponse<msg[]>>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);

  return clientAxios.post(chatListAPI, form);
};

export const growthListFetch = (params: getListByDateParams): Promise<AxiosResponse<ClientAxiosResponse<growthHistory[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(growthListAPI, form);
};

interface replyFetch {
  mem_id: string;
  content_seq_num: string;
  file_div: 'Recording' | 'Speaking' | 'Growth';
  reply?: string;
}

export const replyFetch = ({mem_id, content_seq_num, file_div, reply}: replyFetch): Promise<AxiosResponse<ClientAxiosResponse>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('content_seq_num', content_seq_num);
  form.append('file_div', file_div);
  if (reply) {
    form.append('cmd', 'add');
    form.append('reply', reply);
  }
  return clientAxios.post(replyAPI, form);
};
