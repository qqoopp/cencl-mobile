import {useUserQuery} from '@/hooks/query/useUserQuery';
import {deviceDB} from '@/utils/deviceDB';
import {navigate, replace} from '@/utils/rootNavigations';
import React, {useEffect} from 'react';

export const useSplash = () => {
  const {postLogin} = useUserQuery();

  useEffect(() => {
    setTimeout(() => {
      checkAutoLogin();
    }, 2000);
  }, []);

  const checkAutoLogin = async () => {
    const isKeepLogin = await deviceDB('isKeepLogin', 'get');

    if (isKeepLogin === '1') {
      login();
    } else {
      replace('login');
    }
  };

  const login = async () => {
    const id = await deviceDB('id', 'get');
    const pw = await deviceDB('pw', 'get');
    if (typeof id === 'string' && typeof pw === 'string') {
      // Token is now handled by useFcm hook. Pass empty string.
      postLogin.mutate({mem_id: id, mem_pass: pw, token: ''});
    } else {
      replace('login');
    }
  };
};