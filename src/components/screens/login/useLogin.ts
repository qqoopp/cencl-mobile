import {subscribeInfoFetch} from '@/api/subscribe';
import {loginFetch} from '@/api/user';
import {useUserQuery} from '@/hooks/query/useUserQuery';
import {UseInput, useInput} from '@/hooks/useInput';
import isLoadingStates from '@/states/isLoadingStates';
import memberState from '@/states/memberState';
import {deviceDB} from '@/utils/deviceDB';
import {getDeviceToken} from '@/utils/getDeviceToken';
import {navigate} from '@/utils/rootNavigations';
import {useEffect, useState} from 'react';
import {endConnection, initConnection} from 'react-native-iap';
import SimpleToast from 'react-native-simple-toast';
import {useAtomValue, useSetAtom} from 'jotai';

export const useLogin = () => {
  const {postLogin} = useUserQuery();
  const {isLoading} = useAtomValue(isLoadingStates);

  const setMember = useSetAtom(memberState);

  const id = useInput('');
  const pw = useInput('');

  const [isAcademyDevice, setIsAcademyDevice] = useState(false);
  const [isKeepLogin, setIsKeepLogin] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    checkIsKeelLogin();
    getToken();
  }, []);

  const getToken = async () => {
    const token = await getDeviceToken();
    console.log('token');
    setToken(token);
  };

  const checkIsKeelLogin = async () => {
    const isKeep = await deviceDB('isKeepLogin', 'get');
    const isAcademyDevice = await deviceDB('isAcademyLogin', 'get');

    setIsKeepLogin(isKeep === '1' ? true : false);
    setIsAcademyDevice(isAcademyDevice === '1' ? true : false);
  };

  const onPressIsKeepLogin = () => {
    deviceDB('isKeepLogin', 'set', !isKeepLogin ? '1' : '0');
    setIsKeepLogin(!isKeepLogin);
  };

  const onPressIsAcademyLogin = () => {
    deviceDB('isAcademyLogin', 'set', !isAcademyDevice ? '1' : '0');
    setIsAcademyDevice(!isAcademyDevice);
  };

  const onPressLogin = () => {
    if (isKeepLogin) {
      deviceDB('id', 'set', id.value);
      deviceDB('pw', 'set', pw.value);
    } else {
      deviceDB('pw', 'remove');
      deviceDB('id', 'remove');
    }

    postLogin.mutate({mem_id: id.value, mem_pass: pw.value, token, alarm_device_none_check: isAcademyDevice ? '1' : '0'});
  };

  const onPressSignUp = () => {
    navigate('signUp');
  };

  return {
    id,
    pw,
    isKeepLogin,
    isLoading,
    isAcademyDevice,
    onPressIsKeepLogin,
    onPressLogin,
    onPressSignUp,
    onPressIsAcademyLogin,
  };
};
