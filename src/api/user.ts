import {ClientAxiosResponse} from '@/../type';
import {AxiosResponse} from 'axios';
import {Platform} from 'react-native';
import {clientAxios} from './axiosInstance';
import {loginUrl, signUpUrl} from './url';

export interface loginParams {
  mem_id: string;
  mem_pass: string;
  token?: string;
  alarm_device_none_check: '0' | '1';
}

export const loginFetch = ({mem_id, mem_pass, token, alarm_device_none_check}: loginParams): Promise<AxiosResponse<ClientAxiosResponse>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('mem_pass', mem_pass);
  form.append('os', Platform.OS === 'android' ? 'aos' : 'ios');
  form.append('token', token);
  form.append('alarm_device_none_check', alarm_device_none_check);
  return clientAxios.post(loginUrl, form);
};

export interface signUpParams {
  mem_id: string;
  mem_pass: string;
  os?: 'ios' | 'android';
  shop_code: string;
  mem_phone: string;
  mem_tel: string;
  mem_email: string;
  mem_addr: string;
  mem_name: string;
  mem_sex: '남' | '여';
  school_name: string;
  school_type: '초' | '중' | '고';
  school_grade: string;
  email_google: string;
  email_apple: string;
  errors?: string[]; // 회원가입에는 필요 없음 (회원가입 과정에서 생기는 오류 담기)
  chkPw: string;
}

export const signUpFetch = ({
  mem_id,
  mem_pass,
  shop_code,
  mem_tel,
  mem_phone,
  mem_email,
  mem_addr,
  mem_name,
  mem_sex,
  school_name,
  school_type,
  school_grade,
  email_google,
  email_apple,
}: signUpParams): Promise<AxiosResponse<ClientAxiosResponse>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('mem_pass', mem_pass);
  form.append('os', Platform.OS === 'android' ? 'aos' : 'ios');
  form.append('shop_code', shop_code);
  form.append('mem_phone', mem_phone.slice(0, 3) + '-' + mem_phone.slice(3, 7) + '-' + mem_phone.slice(7));
  form.append('mem_tel', mem_tel);
  form.append('mem_email', mem_email);
  form.append('mem_addr', mem_addr);
  form.append('mem_name', mem_name);
  form.append('mem_sex', mem_sex);
  form.append('school_name', school_name);
  form.append('school_type', school_type);
  form.append('school_grade', school_grade);
  form.append('email_google', email_google);
  form.append('email_apple', email_apple);

  return clientAxios.post(signUpUrl, form);
};
