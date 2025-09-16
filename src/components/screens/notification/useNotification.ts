import {getAlarmFetch, getNoticesFetch} from '@/api/alarmNotice';
import {ModalReturn, useModal} from '@/hooks/useModal';
import memberState from '@/states/memberState';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAtomValue} from 'jotai';

interface Return {
  nowNotiType: notiType;
  alarms: alarm[];
  notices: notice[];
  modal: ModalReturn<'notice'>;
  uri: string;
  onPressAlarmBtn: (alarm: alarm) => void;
  onPressNoticeBtn: (notice: notice) => void;
  onPressNotiTypeBtn: (type: notiType) => void;
}

type notiType = '알림메세지' | '공지사항';

export const useNotification = (): Return => {
  const member = useAtomValue(memberState);
  const [nowNotiType, setNowNotiType] = useState<notiType>('공지사항');
  const [alarms, setAlarms] = useState<alarm[]>([]);
  const [notices, setNotices] = useState<notice[]>([]);
  const [uri, setUri] = useState('');
  const modal = useModal<'notice'>();
  const isFocused = useIsFocused();
  useEffect(() => {
    getAlarmNotices();
  }, [isFocused]);

  const getAlarmNotices = async () => {
    const {
      data: {data: alarms},
    } = await getAlarmFetch({mem_id: member.mem_id, start_date: '2000-01-01', end_date: getFullDateByCalcDaysAgo()});
    const {
      data: {data: notices},
    } = await getNoticesFetch({mem_id: member.mem_id, start_date: '2000-01-01', end_date: getFullDateByCalcDaysAgo()});

    setAlarms(alarms ?? []);
    setNotices(notices ?? []);
  };

  const onPressNotiTypeBtn = (type: notiType) => {
    setNowNotiType(type);
  };

  const onPressAlarmBtn = (alarm: alarm) => {
    console.log(alarm);
  };

  const onPressNoticeBtn = (notice: notice) => {
    console.log('notice 켜줘');
    setUri(notice.seq_num);
    modal.changeType('notice');
  };

  return {
    nowNotiType,
    alarms,
    notices,
    modal,
    uri,
    onPressAlarmBtn,
    onPressNoticeBtn,
    onPressNotiTypeBtn,
  };
};
