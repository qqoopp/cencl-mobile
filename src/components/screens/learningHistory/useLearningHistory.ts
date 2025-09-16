import {readingListFetch, rftListFetch, speakingListFetch, vocaListFetch, writingListFetch} from '@/api/fetch';
import memberState from '@/states/memberState';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import React, {useEffect, useState} from 'react';
import {useAtomValue} from 'jotai';

interface Return {
  period: Date[];
  nowCategory: learningCategory;
  histories: [reading[], speaking[], writing[], rft[], getWordTest[]];
  onChangePeriod: (period: Date[]) => void;
  onChangeCategory: (category: learningCategory) => void;
  onPressChkBtn: () => void;
}

type learningCategory = 'Reading' | 'Speaking' | 'Writing' | '읽기유창성연습' | 'Voca';

export const useLearningHistory = (category?: 'Reading' | 'Speaking' | 'Writing'): Return => {
  const member = useAtomValue(memberState);
  const [nowCategory, setNowCategory] = useState<learningCategory>(category ?? 'Reading');
  const [period, setPeriod] = useState([new Date(getFullDateByCalcDaysAgo(90)), new Date(getFullDateByCalcDaysAgo(-10))]);
  const [histories, setHistories] = useState<[reading[], speaking[], writing[], rft[], getWordTest[]]>([[], [], [], [], []]);

  useEffect(() => {
    getHistories();
  }, [nowCategory]);

  const getHistories = async () => {
    const _period = [...period];
    _period.sort((a, b) => a - b);
    const start_date = _period[0].toISOString().split('T')[0];
    const end_date = _period[1].toISOString().split('T')[0];

    const _histories = histories.slice();

    switch (nowCategory) {
      case 'Reading':
        const {
          data: {data: readings},
        } = await readingListFetch({mem_id: member.mem_id, start_date, end_date});
        _histories[0] = readings;
        break;
      case 'Speaking':
        const {
          data: {data: speakings},
        } = await speakingListFetch({mem_id: member.mem_id, start_date, end_date});
        _histories[1] = speakings;
        break;
      case 'Writing':
        const {
          data: {data: writings},
        } = await writingListFetch({mem_id: member.mem_id, start_date, end_date});
        _histories[2] = writings;

        break;
      case '읽기유창성연습':
        const {
          data: {data: rfts},
        } = await rftListFetch({mem_id: member.mem_id, start_date, end_date});
        _histories[3] = rfts;
        break;
      case 'Voca':
        const {
          data: {data: voca},
        } = await vocaListFetch({mem_id: member.mem_id, start_date, end_date});
        _histories[4] = voca;
        break;
    }
    setHistories(_histories);
  };

  const onChangePeriod = (period: Date[]) => {
    setPeriod(period);
  };

  const onChangeCategory = (category: learningCategory) => setNowCategory(category);

  const onPressChkBtn = () => getHistories();

  return {
    period,
    nowCategory,
    histories,
    onChangePeriod,
    onChangeCategory,
    onPressChkBtn,
  };
};
