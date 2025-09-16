import {chatListFetch, sendChatFetch} from '@/api/fetch';
import memberState from '@/states/memberState';
import React, {useEffect, useState} from 'react';
import SimpleToast from 'react-native-simple-toast';
import {useAtom, useAtomValue} from 'jotai';

interface Return {
  msgs: msg[];
  onPressMsgArrowBtn: (msg: string) => void;
}

export const useConsulting = (): Return => {
  const member = useAtomValue(memberState);
  const [msgs, setMsgs] = useState<msg[]>([]);

  useEffect(() => {
    getMsgs();
  }, []);

  const getMsgs = async () => {
    const {
      data: {data},
    } = await chatListFetch({mem_id: member.mem_id});
    setMsgs(data.reverse());
  };

  const onPressMsgArrowBtn = async (msg: string) => {
    const {data} = await sendChatFetch({mem_id: member.mem_id, content: msg});

    console.log('sendMsg [ ', data, ' ] ');
    if (data.state === 'success') {
      getMsgs();
    } else {
      SimpleToast.show('메세지 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return {
    msgs,
    onPressMsgArrowBtn,
  };
};
