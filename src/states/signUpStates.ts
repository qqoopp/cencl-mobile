import { atom } from 'jotai';
import type { signUpParams } from '@/api/user';

export const initialSignUpState: signUpParams = {
  mem_id: '',
  mem_pass: '',
  shop_code: '',
  mem_tel: '',
  mem_phone: '',
  mem_email: '',
  mem_addr: '',
  mem_name: '',
  mem_sex: '남',
  school_name: '',
  school_type: '초',
  school_grade: '',
  email_google: '',
  email_apple: '',
  errors: [],
  chkPw: '',
};

// Jotai에서는 key 필요 없음
const signUpAtom = atom<signUpParams>(initialSignUpState);

export default signUpAtom;