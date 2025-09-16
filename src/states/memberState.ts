import { atom } from 'jotai';
import type { loginData } from '@/types/common';

export const initialMemberDate: loginData = {
  class_division: '',
  class_month_round: '',
  email_apple: '',
  email_google: '',
  item_code: '',
  item_name: '',
  item_price: '',
  join_date: '',
  join_status: '',
  login_date: '',
  mem_addr: '',
  mem_addr2: '',
  mem_birth: '',
  mem_email: '',
  mem_id: '',
  mem_level: '',
  mem_level2: '',
  mem_name: '',
  mem_pass: '',
  mem_phone: '',
  mem_point: '',
  mem_sex: '',
  mem_status: '',
  mem_tel: '',
  menu_buse_cart: '',
  menu_buse_point: '',
  mobile_first_login_date: '',
  mobile_first_login_time: '',
  parent_seq: '',
  school_grade: '',
  school_name: '',
  school_type: '',
  seq_num: '',
  shop_code: '',
  shop_name: '',
  use_period_start: '',
  withdraw_date: '',
  result_class_month_round: 0,
  next_period_date: '',
};

// Jotai에서는 key 필요 없음
const memberAtom = atom<loginData>(initialMemberDate);

export default memberAtom;