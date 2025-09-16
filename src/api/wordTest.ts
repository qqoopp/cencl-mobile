import {ClientAxiosResponse} from '@/../type';
import {AxiosResponse} from 'axios';
import {clientAxios} from './axiosInstance';
import {wordTestInfoUrl, wordTestStudyUrl, wordTestTestUrl} from './url';

interface getWordTestParams {
  mem_id: string;
  date_start: string;
}

export const getWordTestFetch = ({mem_id, date_start}: getWordTestParams): Promise<AxiosResponse<ClientAxiosResponse<getWordTest[]>>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('date_start', date_start);

  return clientAxios.post(wordTestInfoUrl, form);
};

interface studyWordTestParams {
  mem_id: string;
  test_level: string;
  test_week: string;
}

export const studyWordTestFetch = ({
  mem_id,
  test_level,
  test_week,
}: studyWordTestParams): Promise<AxiosResponse<ClientAxiosResponse<studyWordTest[]>>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('test_level', test_level);
  form.append('test_week', test_week);

  return clientAxios.post(wordTestStudyUrl, form);
};

interface testWordTestParams {
  mem_id: string;
  seq_num: string;
  question_amount: number;
  correct_amount: number;
  new_answer_student: string;
  grade: number;
  leadTime: string;
}

export const testWordTestFetch = ({mem_id, seq_num, question_amount, correct_amount, new_answer_student, grade, leadTime}: testWordTestParams) => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('seq_num', seq_num);
  form.append('question_amount', question_amount);
  form.append('correct_amount', correct_amount);
  form.append('new_answer_student', new_answer_student);
  form.append('grade', grade);
  form.append('leadTime', leadTime);

  return clientAxios.post(wordTestTestUrl, form);
};
