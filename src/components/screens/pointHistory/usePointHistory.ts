import {pointListFetch} from '@/api/fetch';
import memberState from '@/states/memberState';
import React, {useEffect, useState} from 'react';
import {useAtomValue} from 'jotai';

interface Return {
  pointHistoryList: pointHistory[];
}

export const usePointHistory = () => {
  const member = useAtomValue(memberState);
  const [pointHistoryList, setPointHistoryList] = useState<pointHistory[]>([]);

  useEffect(() => {
    getPointList();
  }, []);

  const getPointList = async () => {
    const {
      data: {data},
    } = await pointListFetch({mem_id: member.mem_id});

    setPointHistoryList(data);
  };

  return {
    member,
    pointHistoryList,
  };
};
