import {srtestListFetch} from '@/api/fetch';
import memberState from '@/states/memberState';
import {color} from '@/theme/theme';
import React, {useEffect, useState} from 'react';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {useAtom, useAtomValue} from 'jotai';

interface dataPointParams {
  index: number;
  value: number;
  dataset: Dataset;
  x: number;
  y: number;
  getColor: (opacity: number) => string;
}

interface Returns {
  srtests: srtest[];
  graphData: LineChartData | null;
  hidePoints: number[];
  tooltipPos: {
    x: number;
    y: number;
    visible: boolean;
    value: number;
    index: number;
  };
  yearList: dropDownItem[];
  isShowGeInfo: boolean;
  onPressGeInfoBtn: () => void;
  onDataPointClick: (data: dataPointParams) => void;
  onChangeYear: (value: string) => void;
}

interface dropDownItem {
  value: string;
  label: string;
}

export const useReadingSkillResults = (): Returns => {
  const [srtests, setSrtests] = useState<srtest[]>([]);
  const [graphData, setGraphData] = useState<LineChartData | null>(null);
  const [hidePoints, setHidePoints] = useState<number[]>([]);
  const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0, visible: false, value: 0, index: 0});
  const [isShowGeInfo, setIsShowGeInfo] = useState(false);
  const [yearList, setYearList] = useState<dropDownItem[]>([]);
  const member = useAtomValue(memberState);
  const nowYear = new Date().getFullYear().toString();

  useEffect(() => {
    getYearList();
    getSrtTests(nowYear);
  }, []);

  const getYearList = () => {
    const joinYear = Number(member.class_start_date.split('-')[0]);
    const nowYear = new Date().getFullYear();
    const _yearList = [{value: joinYear + '년 읽기 능력 평가 결과', label: joinYear + '년 읽기 능력 평가 결과'}];

    for (let i = 1; i <= nowYear - joinYear; i++) {
      _yearList.push({value: joinYear + i + '년 읽기 능력 평가 결과', label: joinYear + i + '년 읽기 능력 평가 결과'});
    }

    setYearList(_yearList);
  };

  const getSrtTests = async (year: string) => {
    const {
      data: {data},
    } = await srtestListFetch({mem_id: member.mem_id, start_date: `${year}-01-31`, end_date: `${year}-12-31`});
    setSrtests(data);
    console.log('srtTestsData [ ', data, ' ] ');
    return makeGraphData(data);
  };

  const makeGraphData = (srtests: srtest[]) => {
    const labels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const data = new Array(12).fill(null);

    if (srtests) {
      if (srtests.length > 0) {
        srtests.forEach((srtest, idx) => {
          const testMonth = Number(srtest.sr_date.split('-')[1]);
          data[testMonth - 1] = srtest.sr_ge;
        });
      }
      data[0] = data[0] === null && 0;
      const _hidePoints: number[] = [];
      data.forEach((value, index) => {
        if (value === null || value === 0) _hidePoints.push(index);
      });
      setHidePoints(_hidePoints);

      const graphData: LineChartData = {
        labels: labels,
        datasets: [
          {
            data: [0],
            strokeWidth: 3, // optional
            color: () => 'transparent',
          },
          {
            data: [10],
            strokeWidth: 3, // optional
            color: () => 'transparent',
          },
          {
            data: data,
            strokeWidth: 3, // optional
            color: () => color.main,
            withDots: true,
          },
        ],
      };
      setGraphData(graphData);
    } else {
      const graphData: LineChartData = {
        labels: labels,
        datasets: [
          {
            data: [0],
            strokeWidth: 3, // optional
            color: () => 'transparent',
          },
          {
            data: [10],
            strokeWidth: 3, // optional
            color: () => 'transparent',
          },
          {
            data: data,
            strokeWidth: 3, // optional
            color: () => color.main,
            withDots: true,
          },
        ],
      };
      setGraphData(graphData);
      setHidePoints([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    }
  };

  const onDataPointClick = (data: dataPointParams) => {
    console.log('/ ', data, ' /');
    let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

    isSamePoint
      ? setTooltipPos(previousState => {
          return {
            ...previousState,
            value: data.value,
            visible: !previousState.visible,
          };
        })
      : setTooltipPos({x: data.x, value: data.value, y: data.y, visible: true, index: data.index});
  };

  const onChangeYear = (value: string) => {
    const year = value.split('년')[0];
    setTooltipPos({...tooltipPos, visible: false});
    getSrtTests(year);
  };

  const onPressGeInfoBtn = () => setIsShowGeInfo(!isShowGeInfo);
  return {
    srtests,
    graphData,
    hidePoints,
    tooltipPos,
    isShowGeInfo,
    yearList,
    onPressGeInfoBtn,
    onDataPointClick,
    onChangeYear,
  };
};
