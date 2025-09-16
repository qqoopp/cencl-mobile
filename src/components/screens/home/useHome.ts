import {getCalendarFetch} from '@/api/calendar';
import memberState from '@/states/memberState';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import {navigate, replace} from '@/utils/rootNavigations';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useAtom, useAtomValue} from 'jotai';

type category = '학습현황' | '수업일정';

interface Return {
  selectedDay: number;
  weeks: string[];
  scheduleStatus: (schedule | null)[];
  selectedCategory: category;
  member: loginData;
  onPressClassCard: (category: 'Reading' | 'Speaking' | 'Writing') => void;
  onPressCard: (nextScreen: 'rftList' | 'vocaTest') => void;
  onPressArrow: (arrow: number) => void;
  onPressDay: (day: number) => void;
  onPressCategory: (category: category) => void;
}

export const useHome = (): Return => {
  const member = useAtomValue(memberState);
  const [calendarPostion, setCalndarPosition] = useState(0);
  const [weeks, setWeeks] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [scheduleStatus, setScheduleStatus] = useState<(schedule | null)[]>(new Array(7).fill(null));
  const [selectedCategory, setSelectedCategory] = useState<category>('학습현황');
  const isFocused = useIsFocused();
  useEffect(() => {
    const d = new Date();
    const day = d.getDay(); //

    const _weeks = [];
    console.log('calendarPostion : ', calendarPostion);
    for (let i = 1; i <= 7; i++) {
      _weeks.push(getFullDateByCalcDaysAgo(day - 7 * calendarPostion - i));
    }
    setWeeks(_weeks);
  }, [calendarPostion]);

  useEffect(() => {
    getCalendar(weeks[0], weeks[6]);
  }, [weeks, isFocused]);

  const getCalendar = async (start_date: string, end_date: string) => {
    const {
      data: {data},
    } = await getCalendarFetch({mem_id: member.mem_id, start_date, end_date});

    if (data === null) {
      setScheduleStatus(new Array(7).fill(null));
    } else {
      const _scheduleStatus = new Array(7).fill(null);

      data.forEach((schedule: schedule) => {
        const index = weeks.indexOf(schedule.date);
        if (index !== -1) {
          _scheduleStatus[index] = schedule;
        }
      });

      setScheduleStatus(_scheduleStatus);
    }
  };

  const onPressArrow = (arrow: number) => {
    setCalndarPosition(prev => prev + arrow);
  };

  const onPressDay = (day: number) => setSelectedDay(day);

  const onPressCard = (nextScreen: 'rftList' | 'vocaTest') => {
    navigate(nextScreen, {date: weeks[selectedDay]});
  };

  const onPressClassCard = (category: 'Reading' | 'Speaking' | 'Writing') => {
    navigate('learningHistory', {category});
  };

  const onPressCategory = (category: category) => setSelectedCategory(category);

  return {
    selectedDay,
    weeks,
    scheduleStatus,
    selectedCategory,
    member,
    onPressClassCard,
    onPressCard,
    onPressArrow,
    onPressDay,
    onPressCategory,
  };
};
