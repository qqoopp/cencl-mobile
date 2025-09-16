import {replyFetch} from '@/api/fetch';
import memberState from '@/states/memberState';
import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAtomValue} from 'jotai';

interface Return {
  replies: reply[];
  keyboardHeight: number;
  onPressReplyBtn: (txt: string) => void;
}

export const useReply = (growthHistory: growthHistory): Return => {
  const [replies, setReplies] = useState<reply[]>([]);
  const member = useAtomValue(memberState);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inset = useSafeAreaInsets();

  useEffect(() => {
    getReplies();
  }, []);
  useEffect(() => {
    console.log('키보드 이슈이슈');
    Keyboard.addListener('keyboardDidShow', e => {
      console.log('keyboardDidShow');
      console.log(inset.bottom);
      setKeyboardHeight(e.endCoordinates.height - inset.bottom);
    });
    Keyboard.addListener('keyboardDidHide', e => {
      console.log('keyboardDidHide');
      console.log(e.endCoordinates.height);
      setKeyboardHeight(0);
    });
  }, []);

  const getReplies = async () => {
    console.log('리플을 구해줘');
    const {
      data: {data},
    } = await replyFetch({mem_id: member.mem_id, file_div: growthHistory.file_div, content_seq_num: growthHistory.seq_num});

    setReplies(data);
  };

  const onPressReplyBtn = async (txt: string) => {
    const {
      data: {state},
    } = await replyFetch({mem_id: member.mem_id, file_div: growthHistory.file_div, content_seq_num: growthHistory.seq_num, reply: txt});

    if (state) getReplies();
  };

  return {
    replies,
    keyboardHeight,
    onPressReplyBtn,
  };
};
