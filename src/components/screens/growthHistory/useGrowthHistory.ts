import {growthListFetch} from '@/api/fetch';
import {ModalReturn, useModal} from '@/hooks/useModal';
import {useSound} from '@/hooks/useSound';
import memberState from '@/states/memberState';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import {useEffect, useState} from 'react';
import {useAtomValue} from 'jotai';
import RNFetchBlob from 'react-native-blob-util';

export const useGrowthHistory = (): Return => {
  const memebr = useAtomValue(memberState);
  const [growthHistories, setGrowthHistories] = useState<growthHistory[]>([]);
  const {duration, position, isPlaying, onPressPlayBtn} = useSound();
  const [playingContentIndex, setPlayingContentIndex] = useState<number>(-1);
  const [selectedHistory, setSelectedHistory] = useState<growthHistory | null>(null);
  const [period, setPeriod] = useState([new Date(getFullDateByCalcDaysAgo(365)), new Date()]);
  const [imgUri, setImgUri] = useState('');
  const modal = useModal<'reply' | 'img'>();

  useEffect(() => {
    if (modal.isVisible === false) {
      getGrowthList();
    }
    console.log('petios [ ', period, ' ] ');
  }, [modal.isVisible]);

  const getGrowthList = async () => {
    const _period = [...period];
    _period.sort((a, b) => a - b);
    const start_date = _period[0].toISOString().split('T')[0];
    const end_date = _period[1].toISOString().split('T')[0];
    const {
      data: {data},
    } = await growthListFetch({mem_id: memebr.mem_id, start_date, end_date});

    setGrowthHistories(data);
  };

  const onPressPlayContents = (url: string, index: number, contentType: string) => {
    onPressPlayBtn(url, false);
    setPlayingContentIndex(index);
  };

  const onPressPeriodChkBtn = () => {
    getGrowthList();
  };
  const onChangePeriods = (periods: Date[]) => {
    setPeriod(periods);
    console.log('periods : ', periods);
  };

  const onChangePeriod = (period: Date[]) => {
    setPeriod(period);
  };

  const onPressReplyBtn = (history: growthHistory) => {
    modal.changeType('reply');
    setSelectedHistory(history);
  };

  const onPressImg = (uri: string) => {
    modal.changeType('img');
    setImgUri(uri);
  };

  const onPressChkBtn = () => getGrowthList();

  return {
    growthHistories,
    playingContentIndex,
    duration,
    position,
    selectedHistory,
    modal,
    isPlaying,
    imgUri,
    onPressPlayContents,
    onPressPeriodChkBtn,
    onChangePeriods,
    onPressReplyBtn,
    onChangePeriod,
    onPressChkBtn,
    onPressImg,
  };
};
