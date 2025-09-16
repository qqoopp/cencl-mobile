import {ModalReturn, useModal} from '@/hooks/useModal';
import memberState from '@/states/memberState';
import {deviceDB} from '@/utils/deviceDB';
import {navigate, resetNavigation} from '@/utils/rootNavigations';
import React, {useState} from 'react';
import {useAtomValue} from 'jotai';

interface Return {
  member: loginData;
  modal: ModalReturn<'webView'>;
  uri: string;
  onPressRow: (info: {title: string; screen: string; url?: string}) => void;
  onPressLogout: () => void;
}

export const useParentsPage = (): Return => {
  const [uri, setUri] = useState('');
  const modal = useModal<'webView'>();
  const member = useAtomValue(memberState);

  const onPressLogout = async () => {
    await deviceDB('id', 'remove');
    await deviceDB('pw', 'remove');
    resetNavigation();
  };

  const onPressRow = (info: {title: string; screen: string; url?: string}) => {
    if (info?.screen === '') {
      modal.changeType('webView');
      setUri(info.url);
    } else {
      navigate(info?.screen);
    }
  };

  return {
    member,
    modal,
    uri,
    onPressLogout,
    onPressRow,
  };
};
