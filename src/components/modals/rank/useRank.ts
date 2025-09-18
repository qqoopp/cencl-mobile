import {getRankFetch, getRankMonthListFetch} from '@/api/fetch';
import memberState from '@/states/memberState';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import React, {useEffect, useState} from 'react';
import {useAtomValue} from 'jotai';
import {Dimensions} from 'react-native';

interface Return {
  period: Date[];
  dropDownMonthList: dropDownItem[];
  nowCategory: rankCategory;
  nowDivCategory: rankDivCategory;
  histories: [rank[], rank[], rank[]];
  onChangePeriod: (period: Date[]) => void;
  onChangeCategory: (category: rankCategory) => void;
  onChangeDivCategory: (category: rankDivCategory) => void;
  onPressChkBtn: () => void;
  onChangeSelect: (value: string) => void;
  confettiData: any[];
  isOverlayVisible: boolean;
  handleOverlayPress: () => void;
  isRank: string | undefined; // Allow undefined
  myRankType: string | undefined; // Allow undefined
  myRankNum: string | undefined; // Allow undefined
}

interface dropDownItem {
  value: string;
  label: string;
}

type rankCategory = '단어' | '독서량' | 'RFT';
type rankDivCategory = '원내 랭킹' | '전국 랭킹';

export const useRank = (category: '단어' | '독서량' | 'RFT', divCategory: '원내 랭킹' | '전국 랭킹', is_rank_all: string): Return => {
  const member = useAtomValue(memberState);
  const [nowDivCategory, setNowDivCategory] = useState<rankDivCategory>(divCategory ?? '원내 랭킹');
  const [nowCategory, setNowCategory] = useState<rankCategory>(category ?? '단어');
  const [period, setPeriod] = useState([new Date(getFullDateByCalcDaysAgo(90)), new Date(getFullDateByCalcDaysAgo(-10))]);
  const [histories, setHistories] = useState<[rank[], rank[], rank[]]>([[], [], []]);

  const [dropDownMonthList, setDropDownMonthList] = useState<dropDownItem[]>([]);
  const [dropDownYearSel, setDropDownYearSel] = useState<string>();
  const [dropDownMonthSel, setDropDownMonthSel] = useState<string>();
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 상태 추가

  const [confettiData, setConfettiData] = useState<any[]>([]);
  let interval: NodeJS.Timeout;
  const {width} = Dimensions.get('window');

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const [isRank, setIsRank] = useState<string>('0');
  const [myRankType, setMyRankType] = useState<string>();
  const [myRankNum, setMyRankNum] = useState<string>();

  const [isConfettiChk, setIsConfettiChk] = useState<boolean>(false);

  const handleOverlayPress = () => {
    setIsOverlayVisible(false);
    stopConfetti();
  };

  useEffect(() => {
    getDropDownList();
  }, []);

  useEffect(() => {
    if (isRank === '1') {
      if (!isConfettiChk) {
        setIsOverlayVisible(true);
        startConfetti();
        setIsConfettiChk(true);

        setTimeout(() => {
          setIsOverlayVisible(false);
          stopConfetti();
        }, 10000);
      }
    } else if ((isRank === '0' || isRank === undefined) && !isLoading) {
      setIsOverlayVisible(false);
      stopConfetti();
      setIsConfettiChk(true);
    }
  }, [isRank]); // Add isRank dependency here

  useEffect(() => {
    if (!isLoading) {
      getHistories();
    }
  }, [nowCategory, nowDivCategory, dropDownYearSel, dropDownMonthSel, isLoading]);

  const getHistories = async () => {
    let year = String(dropDownYearSel);
    let month = String(dropDownMonthSel);

    console.log('year2 : ', year);
    console.log('month2 : ', month);

    const _histories = histories.slice();

    try {
      switch (nowCategory) {
        case '단어':
          const {
            data: {data: readings},
          } = await getRankFetch({
            mem_id: member.mem_id,
            year: year,
            month: month,
            is_rank_all: is_rank_all,
            rank_type: '단어',
            rank_div: nowDivCategory,
          });
          _histories[0] = readings;
          console.log(readings);
          readings.some(entry => {
            if (entry.is_rank === '1') {
              setIsRank(entry.is_rank);
              setMyRankType(entry.my_rank_type);
              setMyRankNum(entry.my_rank_num);
              return true; // Stop looping once a match is found
            }
            return false;
          });
          break;

        case '독서량':
          const {
            data: {data: speakings},
          } = await getRankFetch({
            mem_id: member.mem_id,
            year: year,
            month: month,
            is_rank_all: is_rank_all,
            rank_type: '독서량',
            rank_div: nowDivCategory,
          });
          _histories[1] = speakings;
          speakings.some(entry => {
            if (entry.is_rank === '1') {
              setIsRank(entry.is_rank);
              setMyRankType(entry.my_rank_type);
              setMyRankNum(entry.my_rank_num);
              return true;
            }
            return false;
          });
          break;

        case 'RFT':
          const {
            data: {data: writings},
          } = await getRankFetch({
            mem_id: member.mem_id,
            year: year,
            month: month,
            is_rank_all: is_rank_all,
            rank_type: 'RFT',
            rank_div: nowDivCategory,
          });
          _histories[2] = writings;
          writings.some(entry => {
            if (entry.is_rank === '1') {
              setIsRank(entry.is_rank);
              setMyRankType(entry.my_rank_type);
              setMyRankNum(entry.my_rank_num);
              return true;
            }
            return false;
          });
          break;
      }
    } catch (error) {
      console.error('Failed to fetch ranking data', error);
    } finally {
      setIsLoading(false);
    }

    setHistories(_histories);
  };

  const startConfetti = () => {
    interval = setInterval(() => {
      const newConfetti = {
        id: Math.random().toString(),
        count: Math.floor(Math.random() * 50) + 50, // 랜덤 폭죽 개수
        origin: {x: Math.random() * width, y: 0}, // 랜덤 X 위치에서 떨어짐
        fallSpeed: Math.random() * 2000 + 3000, // 낙하 속도를 2초 ~ 6초 사이로 랜덤 설정
      };
      setConfettiData(prevData => [...prevData, newConfetti]);
    }, 700); // 0.7초 간격으로 새로운 폭죽 추가
  };

  const stopConfetti = () => {
    clearInterval(interval);
    setConfettiData([]); // 모든 폭죽 효과 종료
  };

  const getDropDownList = async () => {
    const {
      data: {data: month_list},
    } = await getRankMonthListFetch({
      mem_id: member.mem_id,
    });

    const dropDownList = [];

    const currentDate = new Date(); // 현재 날짜
    const currentYear = currentDate.getFullYear(); // 올해 년도
    const currentMonth = currentDate.getMonth() + 1; // 이번 달 (0부터 시작하므로 1을 더함)

    var lastYear = currentYear;
    var lastMonth = currentMonth;

    month_list.some(entry => {
      // 만약 이번 년도와 월과 일치하면 "이달의 랭킹"으로 label 설정
      const label =
        parseInt(entry.rank_year) === currentYear && parseInt(entry.rank_month) === currentMonth
          ? '이달의 랭킹' // 현재 년도와 월이 일치하면 "이달의 랭킹"
          : `${entry.rank_year}년 ${entry.rank_month}월 랭킹`; // 아니면 기존 형태 유지

      dropDownList.push({
        value: `${entry.rank_year}년 ${entry.rank_month}월 랭킹`,
        label: label,
      });

      lastYear = parseInt(entry.rank_year);
      lastMonth = parseInt(entry.rank_month);
    });

    // 마지막으로 추가된 year와 month로 설정

    console.log(dropDownList);
    setDropDownYearSel(String(lastYear));
    setDropDownMonthSel(String(lastMonth));
    setDropDownMonthList(dropDownList);
    setIsLoading(false); // 초기 리스트가 설정되면 로딩 상태 해제
  };

  const onChangePeriod = (period: Date[]) => {
    setPeriod(period);
  };

  const onChangeCategory = (category: rankCategory) => setNowCategory(category);

  const onChangeDivCategory = (category: rankDivCategory) => setNowDivCategory(category);

  const onChangeSelect = (value: string) => {
    const year = value.split(' ')[0].replace('년', '');
    const month = value.split(' ')[1].replace('월', '');
    console.log('year : ', year);
    console.log('month : ', month);

    setDropDownYearSel(year);
    setDropDownMonthSel(month);
  };

  const onPressChkBtn = () => getHistories();

  return {
    period,
    nowCategory,
    nowDivCategory,
    histories,
    dropDownMonthList,
    onChangePeriod,
    onChangeCategory,
    onChangeDivCategory,
    onChangeSelect,
    onPressChkBtn,
    confettiData,
    isOverlayVisible,
    handleOverlayPress,
    isRank,
    myRankType,
    myRankNum,
  };
};
