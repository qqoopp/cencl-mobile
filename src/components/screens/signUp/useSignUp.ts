import {campusListFetch} from '@/api/shop';
import {loginFetch, signUpFetch} from '@/api/user';
import {ModalReturn, useModal} from '@/hooks/useModal';
import signUpStates, {initialSignUpState} from '@/states/signUpStates';
import {metrics} from '@/theme/theme';
import {isEmail, isId, isName, isPw} from '@/utils/regExp';
import {goBack, replace} from '@/utils/rootNavigations';
import {useEffect, useRef, useState} from 'react';
import {Platform, ScrollView} from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import {useAtom} from 'jotai';

interface campus {
  shop_addr: string;
  shop_code: string;
  shop_name: string;
  shop_tel: string;
  label: string;
  key: string;
}

interface Returns {
  isCanNextPage: boolean;
  signUpPageIndex: number;
  scrollViewRef: React.RefObject<ScrollView>;
  campuses: campus[];
  errors: string[];
  modal: ModalReturn<'appId' | 'terms'>;
  uri: string;
  onPressTermsBtn: (type: 'service' | 'privacy') => void;
  onPressLeftBtn: () => void;
  onPressNextBtn: () => void;
  onChangeSelector: (option: campus, type: string) => void;
  onChangeText: (text: string, type: string) => void;
  onPressPickerBtn: () => void;
}

export const useSignUp = (): Returns => {
  const scrollViewRef = useRef<ScrollView>(null);
  const modal = useModal<'appId' | 'terms'>();

  const [uri, setUri] = useState('');
  const [signUpInfo, setSignUpInfo] = useAtom(signUpStates);
  const [signUpPageIndex, setSignUpPageIndex] = useState(0);
  const [isCanNextPage, setIsCanNextPage] = useState(false);
  const [campuses, setCampuses] = useState([]);

  useEffect(() => {
    campusListFetch().then(({data}) => {
      if (data?.state === 'success') {
        const campuses: campus[] = data.data.map(res => {
          res.label = res.shop_name;
          res.key = res.shop_name;

          return res;
        });
        setCampuses(campuses);
      }
    });

    return () => {
      setSignUpInfo(initialSignUpState);
    };
  }, []);

  useEffect(() => {
    scrollViewRef.current?.scrollTo({
      x: metrics.screenWidth * signUpPageIndex,
    });
  }, [signUpPageIndex]);

  useEffect(() => {
    if (signUpPageIndex === 0) {
      console.log('shop_code : ', signUpInfo.shop_code);
      console.log('mem_id : ', signUpInfo.mem_id);
      console.log('mem_pass : ', signUpInfo.mem_pass);
      console.log('chkPw : ', signUpInfo.chkPw);

      if (signUpInfo.shop_code !== '' && signUpInfo.mem_id !== '' && signUpInfo.mem_pass !== '' && signUpInfo.chkPw !== '') {
        setIsCanNextPage(true);
      } else {
        setIsCanNextPage(false);
      }
    } else if (signUpPageIndex === 1) {
      signUpInfo.mem_phone.length > 10 ? setIsCanNextPage(true) : setIsCanNextPage(false);
    } else if (signUpPageIndex === 2) {
      if (signUpInfo.mem_name !== '' && signUpInfo.mem_sex !== '' && signUpInfo.school_grade !== '') {
        setIsCanNextPage(true);
      } else {
        setIsCanNextPage(false);
      }
    } else if (signUpPageIndex === 3) {
      console.log('페이지 4');
      const email = Platform.OS === 'android' ? signUpInfo.email_google : signUpInfo.email_apple;
      console.log('isEmail : ', isEmail(email));
      setIsCanNextPage(isEmail(email));
    }
  }, [signUpInfo]);

  const onPressLeftBtn = () => {
    if (signUpPageIndex === 0) {
      goBack();
    } else {
      setSignUpPageIndex(prev => prev - 1);
    }
  };

  const onChangeText = (text: string, type: string) => {
    switch (type) {
      case '아이디':
        setSignUpInfo({...signUpInfo, mem_id: text});
        break;
      case '비밀번호':
        setSignUpInfo({...signUpInfo, mem_pass: text});
        break;
      case '비밀번호 체크':
        setSignUpInfo({...signUpInfo, chkPw: text});
        break;
      case '휴대폰':
        setSignUpInfo({...signUpInfo, mem_phone: text});
        break;
      case '전화번호':
        setSignUpInfo({...signUpInfo, mem_tel: text});
        break;
      case '이메일':
        setSignUpInfo({...signUpInfo, mem_email: text});
        break;
      case '주소':
        setSignUpInfo({...signUpInfo, mem_addr: text});
        break;
      case '이름':
        setSignUpInfo({...signUpInfo, mem_name: text});
        break;
      case '학교':
        setSignUpInfo({...signUpInfo, school_name: text});
        break;
      case '계정ID':
        Platform.OS === 'android' ? setSignUpInfo({...signUpInfo, email_google: text}) : setSignUpInfo({...signUpInfo, email_apple: text});
        break;
    }
  };

  const onChangeSelector = (option: campus, type: string) => {
    switch (type) {
      case '캠퍼스':
        setSignUpInfo({...signUpInfo, shop_code: option.shop_code});
        break;
      case '성별':
        setSignUpInfo({...signUpInfo, mem_sex: option.label});
        break;
      case '학년':
        const school_type: '초' | '중' | '고' = option.label.split(' ')[0].substring(0, 1);
        const school_grade = option.label.split(' ')[1].substring(0, 1);
        console.log('school_type : ', school_type);
        console.log('school_grade : ', school_grade);

        setSignUpInfo({...signUpInfo, school_grade, school_type});
        break;
      default:
        break;
    }
    console.log('option : ', option);
  };

  const onPressNextBtn = () => {
    // 첫번째 페이지 조건
    if (signUpPageIndex === 0) {
      const _errors = checkFirstPage(signUpInfo.shop_code, signUpInfo.mem_id, signUpInfo.mem_pass, signUpInfo.chkPw);
      console.log('first page check ', _errors);
      if (_errors.length === 0) {
        setIsCanNextPage(false);
        setSignUpInfo({...signUpInfo, errors: []});
        setSignUpPageIndex(prev => prev + 1);
      } else {
        setSignUpInfo({...signUpInfo, errors: _errors});
      }
      // 두번째 페이지 조건
    } else if (signUpPageIndex === 1) {
      if (signUpInfo.mem_phone.length > 10) {
        setSignUpPageIndex(prev => prev + 1);
        setIsCanNextPage(false);
        setSignUpInfo({...signUpInfo, errors: []});
      }
      // 세번째 페이지 조건
    } else if (signUpPageIndex === 2) {
      const _errors = checkThirdPage(signUpInfo.mem_name, signUpInfo.mem_sex, signUpInfo.school_grade);
      if (_errors.length === 0) {
        setIsCanNextPage(false);
        setSignUpInfo({...signUpInfo, errors: []});
        setSignUpPageIndex(prev => prev + 1);
      } else {
        setSignUpInfo({...signUpInfo, errors: _errors});
      }
    } else if (signUpPageIndex === 3) {
      const email = Platform.OS === 'android' ? signUpInfo.email_google : signUpInfo.email_apple;
      const _errors = checkFourthPage(email);
      if (_errors.length === 0) {
        signUpFetch(signUpInfo).then(({data}) => {
          if (data.state === 'success') {
            console.log('회원가입 석세스');
            replace('requestPush');

            setSignUpInfo(initialSignUpState);
          } else {
            SimpleToast.show(data.msg);
          }
        });
      } else {
        setSignUpInfo({...signUpInfo, errors: _errors});
      }
    }
  };
  const onPressPickerBtn = () => {};

  const onPressTermsBtn = (type: 'service' | 'privacy') => {
    setUri(type === 'privacy' ? 'https://cenman.co.kr/pipa.html' : 'https://cenman.co.kr/service_check.html');
    modal.changeType('terms');
  };
  return {
    isCanNextPage,
    signUpPageIndex,
    scrollViewRef,
    campuses,
    errors: signUpInfo.errors ?? [],
    modal,
    uri,
    onPressTermsBtn,
    onPressLeftBtn,
    onPressNextBtn,
    onChangeText,
    onChangeSelector,
    onPressPickerBtn,
  };
};

const checkFirstPage = (shop: string, id: string, pw: string, chkPw: string) => {
  const errList = [];

  if (shop === '') errList.push('캠퍼스');
  if (!isId(id)) errList.push('아이디');
  if (!isPw(pw)) errList.push('비밀번호');
  if (pw !== chkPw) errList.push('비밀번호 체크');

  return errList;
};

const checkSecondPage = (phone: string) => {};

const checkThirdPage = (name: string, sex: '남' | '여', grade: string) => {
  const errList = [];

  if (!isName(name)) errList.push('이름');
  if (sex !== '남' && sex !== '여') errList.push('성별');
  if (grade === '') errList.push('학년');
  return errList;
};

const checkFourthPage = (email: string) => {
  const errList = [];

  if (!isEmail(email)) errList.push('계정ID');

  return errList;
};
