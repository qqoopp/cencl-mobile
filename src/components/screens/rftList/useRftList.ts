import {delRecordFileFetch, getRftListFetch} from '@/api/rft';
import memberState from '@/states/memberState';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import React, {useEffect, useState} from 'react';
import {useAtom, useAtomValue} from 'jotai';
import {rftListProps} from '.';
import {useSound} from '@/hooks/useSound';
import {useIsFocused} from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';

export const useRftList = (date: string): Return => {
  console.log('rftList화면');
  const [rfts, setRfts] = useState<rft[]>([]);
  const isFocused = useIsFocused();
  const member = useAtomValue(memberState);

  const {onPressPlayBtn} = useSound();

  useEffect(() => {
    getRfts();
  }, [isFocused]);

  const getRfts = async () => {
    const {
      data: {data},
    } = await getRftListFetch({mem_id: member.mem_id, start_date: date, end_date: date});
    setRfts(data);
  };

  const onPressRecordRft = (url: string) => {
    onPressPlayBtn(url, false);
  };

  const delRftList = (seq_num: string) => {
    delRecordFileFetch({mem_id: member.mem_id, seq_num});
  };

  const onPressTrashBtn = async (seq_num: string) => {
    const {data} = await delRecordFileFetch({mem_id: member.mem_id, seq_num});
    if (data.state === 'success') {
      SimpleToast.show(data.msg);
    }
    getRfts();
  };

  return {
    rfts,
    onPressRecordRft,
    delRftList,
    onPressTrashBtn,
  };
};
