declare interface loginData {
  attend_1: '1' | '0';
  attend_2: '1' | '0';
  attend_3: '1' | '0';
  attend_4: '1' | '0';
  attend_5: '1' | '0';
  attend_6: '1' | '0';
  attend_s_1: '1' | '0';
  attend_s_2: '1' | '0';
  attend_s_3: '1' | '0';
  attend_s_4: '1' | '0';
  attend_s_5: '1' | '0';
  attend_s_6: '1' | '0';
  attend_v_1: '1' | '0';
  attend_v_2: '1' | '0';
  attend_v_3: '1' | '0';
  attend_v_4: '1' | '0';
  attend_v_5: '1' | '0';
  attend_v_6: '1' | '0';
  attend_w_1: '1' | '0';
  attend_w_2: '1' | '0';
  attend_w_3: '1' | '0';
  attend_w_4: '1' | '0';
  attend_w_5: '1' | '0';
  attend_w_6: '1' | '0';
  class_division: string;
  class_month_round: string;
  email_apple: string;
  email_google: string;
  item_code: string;
  item_name: string;
  item_price: string;
  join_date: string;
  join_status: string;
  login_date: string;
  mem_addr: string;
  mem_addr2: string;
  mem_birth: string;
  mem_email: string;
  mem_id: string;
  mem_level: string;
  mem_level2: string;
  mem_name: string;
  mem_pass: string;
  mem_phone: string;
  mem_point: string;
  mem_sex: string;
  mem_status: string;
  mem_tel: string;
  menu_buse_cart: string;
  menu_buse_point: string;
  mobile_first_login_date: string;
  mobile_first_login_time: string;
  parent_seq: string;
  school_grade: string;
  school_name: string;
  school_type: string;
  seq_num: string;
  shop_code: string;
  shop_name: string;
  use_period_start: string;
  withdraw_date: string;
  class_start_date: string;
  last_use_period_end: string;
  result_class_month_round: number;
  next_period_date: string;
}

declare interface subscribeInfoData {
  class_division: string;
  class_month_round: string;
  email_apple: string;
  email_google: string;
  item_code: string;
  item_name: string;
  item_price: string;
  join_date: string;
  join_status: string;
  login_date: string;
  mem_addr: string;
  mem_addr2: string;
  mem_birth: string;
  mem_email: string;
  mem_id: string;
  mem_level: string;
  mem_level2: string;
  mem_name: string;
  mem_pass: string;
  mem_phone: string;
  mem_point: string;
  mem_sex: '남' | '여';
  mem_status: string;
  mem_tel: string;
  menu_buse_cart: string;
  menu_buse_point: string;
  mobile_first_login_date: string;
  mobile_first_login_time: string;
  parent_seq: string;
  school_grade: string;
  school_name: string;
  school_type: string;
  seq_num: string;
  shop_code: string;
  shop_name: string;
  use_period_start: string;
  withdraw_date: string;
}

declare interface rft {
  H: string;
  book_audio_path: string;
  book_author: string;
  book_cbc: string;
  book_cbn: string;
  book_img_path: string;
  book_pages: string;
  book_quiz: string;
  book_series: string;
  book_title: string;
  date: string;
  diary_seq_num: string;
  reading_AR: string;
  reading_N: string;
  reading_R: string;
  reading_seq_num: string;
  rft_class_date: string;
  rft_edit_date: string;
  rft_edit_time: string;
  rft_read_accuracy: string;
  rft_read_rate: string;
  rft_read_time: string;
  rft_reg_date: string;
  rft_reg_time: string;
  rft_seq_num: string;
  seq_num: string;
  rft_text: string;
  rft_upload_audio_file: {
    rft_file_reg_date: string;
    rft_upload_audio_path: string;
    sections: string;
  }[];
}

declare interface speaking {
  book_audio_path: string;
  book_cbn_s: string;
  book_img_path: string;
  book_series_s: string;
  book_title_s: string;
  date: string;
  diary_audio_path: string;
  library_seq_num: string;
  seq_num: string;
  speaking_RFT: string;
  speaking_S: string;
  speaking_booktalking: string;
  speaking_homework: string;
  speaking_level: string;
  speaking_pronunciation: string;
}

declare interface reading {
  H: string;
  book_audio_path: string;
  book_author: string;
  book_cbc: string;
  book_cbn: string;
  book_img_path: string;
  book_pages: string;
  book_quiz: string;
  book_series: string;
  book_title: string;
  date: string;
  reading_AR: string;
  reading_N: string;
  reading_R: string;
  seq_num: string;
}

declare interface writing {
  book_audio_path: string;
  book_cbn_w: string;
  book_img_path: string;
  book_series_w: string;
  book_title_w: string;
  date: string;
  library_seq_num: string;
  seq_num: string;
  writing_W: string;
  writing_grammar: string;
  writing_handwriting: string;
  writing_homework: string;
  writing_level: string;
  writing_structure: string;
  writing_understanding: string;
}

declare interface getWordTest {
  correct_amount: string;
  date_end: string;
  date_start: string;
  grade: string;
  leadTime: string;
  new_answer_sheet: string;
  new_answer_student: string;
  new_word_ids: string;
  question_amount: string;
  seq_num: string;
  status: string;
  test_level: string;
  test_times: string;
  test_type: string;
  test_week: string;
}

declare interface studyWordTest {
  example_eng: string;
  f_fullpath_0: string;
  f_fullpath_1: string;
  meaning_eng: string;
  meaning_kor: string;
  seq_num: number;
  test_level: number;
  test_week: number;
  word: string;
}

declare interface alarm {
  alarm_div: string;
  buse: number;
  content: string;
  date: string;
  read_mem: string;
  read_mem_grp: number;
  seq_num: string;
  title: string;
}

declare interface notice {
  buse: string;
  content: string;
  date: string;
  date_write: string;
  read_mem: string;
  read_mem_grp: string;
  seq_num: string;
  title: string;
  write_mem_id: string;
  write_mem_name: string;
}

declare interface srtest {
  seq_num: string;
  sr_date: string;
  sr_ge: string;
  sr_irl: string;
  sr_target: string;
  sr_zpd: string;
}

declare interface pointHistory {
  check_time: string;
  comment: string;
  point: number;
  point_gbn: string;
  seq_num: string;
  sum_point: number;
}

declare interface report {
  aData: [string, number][];
  attend_rate: string;
  avg_ar_quiz: number;
  avg_book_level: number;
  avg_book_level_F: number;
  avg_book_level_NF: number;
  avg_grammer: number;
  avg_homework: number;
  avg_speaking_homework: number;
  avg_speaking_s: number;
  avg_writing_homework: number;
  avg_writing_w: number;
  cen_voca_test: number;
  comment: string | null;
  delta_level: string;
  delta_speaking: string;
  delta_writing: string;
  expected_level_up: string;
  mem_name: string;
  num_books_read: number;
  num_reading_class: number;
  num_rft_record: number;
  num_speaking_class: number;
  num_speaking_record: number;
  num_wordtest_assigned: number;
  num_wordtest_completed: number;
  num_writing_class: number;
  sData: [string, number][];
  shop_name: string;
  speaking_level: string;
  wData: [string, number][];
  writing_level: string;
}

declare interface msg {
  content: string;
  date: string;
  date_write: string;
  isIncoming: '0' | '1';
  mem_id: string;
  seq_num: string;
  shop_id: string;
}

interface growthHistory {
  b_inputname: string;
  content_cnt: number;
  date: string;
  f_fullpath: string;
  f_name: string;
  file_div: string;
  file_div_kor: string;
  file_seq_num: string;
  reply_cnt: string;
  seq_num: string;
  contentType: string;
}

interface reply {
  buse: string;
  content: string;
  content_seq_num: string;
  date: string;
  file_div: string;
  seq_num: string;
  write_mem_id: string;
  write_mem_name: string;
}

declare interface schedule {
  attend: '출석' | '결석';
  attend_s: '출석' | '결석';
  attend_v: '출석' | '결석';
  attend_w: '출석' | '결석';
  date: string;
  rft_is: '없음' | '있음';
  rft_seq_num: '';
  seq_num: string;
  status: '진행중' | '완료' | '';
  test_type: string;
  wordtest_is: '없음' | '있음';
}
