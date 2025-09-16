import {ClientAxiosResponse} from '@/../type';
import {AxiosResponse} from 'axios';
import {clientAxios} from './axiosInstance';
import {rftDeleteUrl, rftListUrl, rftWriteUrl} from './url';
import {getFormDataFromParams} from '@/utils/getFormDataFromParams';

interface getRftListParams {
  mem_id: string;
  start_date: string;
  end_date: string;
  [key: string]: string;
}

export const getRftListFetch = (params: getRftListParams): Promise<AxiosResponse<ClientAxiosResponse<rft[]>>> => {
  const form = getFormDataFromParams(params);

  return clientAxios.post(rftListUrl, form);
};

interface writeRftParams {
  mem_id: string;
  diary_seq_num: string;
  read_rate: string;
  read_time: string;
  read_accuracy: string;
  RecordFileUri: string;
}

export const writeRftFetch = ({mem_id, diary_seq_num, read_rate, read_time, read_accuracy, RecordFileUri}: writeRftParams) => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('diary_seq_num', diary_seq_num);
  form.append('read_rate', read_rate);
  form.append('read_time', read_time);
  form.append('read_accuracy', read_accuracy);
  form.append('RecordFile', {
    uri: RecordFileUri,
    type: 'audio/aac',
    name: 'audoFile',
  });
  form.append('sections', '');

  return clientAxios.post(rftWriteUrl, form);
};

interface delRecordFile {
  mem_id: string;
  seq_num: string;
}

export const delRecordFileFetch = ({mem_id, seq_num}: delRecordFile) => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('seq_num', seq_num);
  return clientAxios.post(rftDeleteUrl, form);
};
