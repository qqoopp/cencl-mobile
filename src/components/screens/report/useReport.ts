import {getReportFetch} from '@/api/fetch';
import {learningCategory, reportCategory} from '@/components/blocks/learningCategoryRow';
import memberState from '@/states/memberState';
import {color} from '@/theme/theme';
import {useEffect, useState} from 'react';
import {Dataset} from 'react-native-chart-kit/dist/HelperTypes';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {useAtomValue} from 'jotai';

interface dataPointParams {
  index: number;
  value: number;
  dataset: Dataset;
  x: number;
  y: number;
  getColor: (opacity: number) => string;
}

interface dropDownItem {
  value: string;
  label: string;
}

interface gradeItem {
  title: string;
  value: string | number;
}

interface gradeBySubject {
  Reading: gradeItem[];
  Speaking: gradeItem[];
  Writing: gradeItem[];
  Voca: gradeItem[];
}

const getGradeBySubject = (report: report) => {
  const readingGrade = [
    {title: 'Reading 숙제 평균', value: report?.avg_homework},
    {title: 'Reading 수업 횟수', value: report?.num_reading_class},
    {title: '전월 대비 레벨 상승', value: report?.delta_level},
    {title: '독서 수 (권)', value: report?.num_books_read},
  ];

  const fictionReadingGrade = [{title: '독서 평균레벨', value: report?.avg_book_level_F}, ...readingGrade];

  const nonFictionReadingGrade = [
    {title: '독서 평균레벨(픽션)', value: report?.avg_book_level_F},
    {title: '독서 평균레벨(논픽션)', value: report?.avg_book_level_NF},
    ...readingGrade,
  ];

  const speakingGrade = [
    {title: 'Speaking Level', value: report?.speaking_level},
    {title: 'Speaking 숙제 평균', value: report?.avg_speaking_homework},
    {title: 'Speaking 수업 횟수', value: report?.num_speaking_class},
    {title: '읽기유창성(RFT) 연습 횟수', value: report?.num_rft_record},
    {title: 'Speaking 녹음 횟수', value: report?.num_speaking_record},
    {title: 'Speaking 평점 변화', value: report?.delta_speaking},
    {title: 'Speaking 평균', value: report?.avg_speaking_s},
  ];

  const writingGrade = [
    {title: 'Writing Level', value: report?.writing_level},
    {title: 'Writing 숙제 평균', value: report?.avg_writing_homework},
    {title: 'Writing 수업 횟수', value: report?.num_writing_class},
    {title: 'Writing 평점 변화', value: report?.delta_writing},
    {title: 'Writing 평균', value: report?.avg_writing_w},
    {title: 'Grammar 평점', value: report?.avg_grammer},
  ];

  const vocaGrade = [
    {title: 'CenMan 단어 완료', value: report?.num_wordtest_completed},
    {title: '배정', value: report?.num_wordtest_assigned},
    {title: 'CenVoca Test 평균', value: report?.cen_voca_test},
  ];

  const gradeBySubject = {
    Reading: report?.avg_book_level_NF === 0 ? fictionReadingGrade : nonFictionReadingGrade,
    Speaking: speakingGrade,
    Writing: writingGrade,
    Voca: vocaGrade,
  };

  return gradeBySubject;
};

interface Return {
  report: report | null;
  nowCategory: reportCategory;
  dropDownMonthList: dropDownItem[];
  graphData: {Reading: LineChartData; Speaking: LineChartData; Writing: LineChartData} | null;
  hidePoints: {Reading: number[]; Speaking: number[]; Writing: number[]} | null;
  tooltipPos: {
    x: number;
    y: number;
    visible: boolean;
    value: number;
    index: number;
  };
  gradeBySubject: gradeBySubject | null;
  onDataPointClick: (data: dataPointParams) => void;
  onChangeCategory: (categoty: reportCategory) => void;
  onChangeSelect: (value: string) => void;
}

export const useReport = (): Return => {
  const member = useAtomValue(memberState);

  const [nowCategory, setNowCategory] = useState<reportCategory>('Reading');
  const [report, setReport] = useState<null | report>(null);
  const [dropDownMonthList, setDropDownMonthList] = useState<dropDownItem[]>([]);
  const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0, visible: false, value: 0, index: 0});
  const [graphData, setGraphData] = useState<{Reading: LineChartData; Speaking: LineChartData; Writing: LineChartData} | null>(null);
  const [hidePoints, setHidePoints] = useState<{Reading: number[]; Speaking: number[]; Writing: number[]} | null>(null);
  const [gradeBySubject, setGradeBySubject] = useState<gradeBySubject | null>(null);

  useEffect(() => {
    const nowMonth = new Date().getMonth() + 1;
    const nowYear = new Date().getFullYear();

    getDropDownList();
    getReport(nowYear.toString(), nowMonth.toString());
  }, []);

  const getDropDownList = () => {
    const joinYear = Number(member.class_start_date.split('-')[0]);
    const nowYear = new Date().getFullYear();

    const joinMonth = Number(member.class_start_date.split('-')[1]);
    const nowMonth = new Date().getMonth() + 1;

    const dropDownList: dropDownItem[] = [];

    if (nowYear === joinYear) {
      for (let i = joinMonth; i <= nowMonth; i++) {
        dropDownList.push({value: `${joinYear}년 ${i}월 성적표`, label: `${joinYear}년 ${i}월 성적표`});
      }
    } else {
      for (let i = joinMonth; i <= 12; i++) {
        dropDownList.push({value: `${joinYear}년 ${i}월 성적표`, label: `${joinYear}년 ${i}월 성적표`});
      }

      for (let i = 1; i < nowYear - joinYear; i++) {
        for (let j = 1; j <= 12; j++) {
          dropDownList.push({value: `${joinYear + i}년 ${j}월 성적표`, label: `${joinYear + i}년 ${j}월 성적표`});
        }
      }

      for (let j = 1; j <= nowMonth; j++) {
        dropDownList.push({value: `${nowYear}년 ${j}월 성적표`, label: `${nowYear}년 ${j}월 성적표`});
      }
    }

    setDropDownMonthList(dropDownList);
  };

  const getReport = async (year: string, month: string) => {
    const {
      data: {data},
    } = await getReportFetch({
      mem_id: member.mem_id,
      month: `${year}-${month.length === 1 ? '0' + month : month}`,
      sDay: `${year}-${month.length === 1 ? '0' + month : month}-01`,
      eDay: `${year}-${month.length === 1 ? '0' + month : month}-31`,
    });

    console.log('report : [ ', data[0], ' ] ');

    setReport(data[0]);
    getGraphData(data[0]);
    const gradeBySubject = getGradeBySubject(data[0]);
    setGradeBySubject(gradeBySubject);
  };

  const getGraphData = (reportList: report) => {
    const labels: string[] = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ];

    const readingData = new Array(31).fill(null);
    const speakingData = new Array(31).fill(null);
    const writingData = new Array(31).fill(null);

    console.log('reportData length', reportList);

    if (reportList) {
      reportList.aData.forEach(([fullDate, point], index) => {
        console.log('adata');
        const date = fullDate.split('-')[2];
        console.log('일자 : ', date);
        console.log('성적 : ', point);

        readingData[Number(date) - 1] = point;
      });
      reportList.sData.forEach(([fullDate, point], index) => {
        const date = fullDate.split('-')[2];
        speakingData[Number(date) - 1] = point;
      });
      reportList.wData.forEach(([fullDate, point], index) => {
        const date = fullDate.split('-')[2];
        console.log('wData point : ', point);
        writingData[Number(date) - 1] = point;
      });
    }

    const readingHides: number[] = [];
    const speakingHides: number[] = [];
    const writingHides: number[] = [];

    for (let i = 0; i <= 30; i++) {
      if (readingData[i] === null) readingHides.push(i);
      if (speakingData[i] === null) speakingHides.push(i);
      if (writingData[i] === null) writingHides.push(i);
    }

    setHidePoints({Reading: readingHides, Speaking: speakingHides, Writing: writingHides});

    console.log('readingData : ', readingData);
    console.log('speakingData : ', speakingData);
    console.log('writingData : ', writingData);

    const readingGraphData: LineChartData = {
      labels: labels,
      datasets: [
        {data: [0], strokeWidth: 3, color: () => 'transparent'},
        {data: [100], strokeWidth: 3, color: () => 'transparent'},
        {
          data: readingData,
          strokeWidth: 3, // optional
          color: () => color.main,
          withDots: true,
        },
      ],
    };
    const speakingGraphData: LineChartData = {
      labels: labels,
      datasets: [
        {data: [0], strokeWidth: 3, color: () => 'transparent'},
        {data: [100], strokeWidth: 3, color: () => 'transparent'},
        {
          data: speakingData,
          strokeWidth: 3, // optional
          color: () => color.main,
          withDots: true,
        },
      ],
    };
    const writingGraphData: LineChartData = {
      labels: labels,
      datasets: [
        {data: [0], strokeWidth: 3, color: () => 'transparent'},
        {data: [100], strokeWidth: 3, color: () => 'transparent'},
        {
          data: writingData,
          strokeWidth: 3, // optional
          color: () => color.main,
          withDots: true,
        },
      ],
    };

    console.log('---------------------------   graphData    -------------------------');
    console.log(writingGraphData);
    console.log(speakingGraphData);
    console.log(readingGraphData);
    console.log('---------------------------   graphData    -------------------------');

    setGraphData({
      Writing: writingGraphData,
      Speaking: speakingGraphData,
      Reading: readingGraphData,
    });
  };

  const onChangeCategory = (categoty: reportCategory) => {
    setTooltipPos({...tooltipPos, visible: false});
    setNowCategory(categoty);
  };

  const onChangeSelect = (value: string) => {
    const year = value.split(' ')[0].replace('년', '');
    const month = value.split(' ')[1].replace('월', '');
    console.log('year : ', year);
    console.log('month : ', month);
    setTooltipPos({...tooltipPos, visible: false});
    getReport(year, month);
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

  return {
    report,
    nowCategory,
    dropDownMonthList,
    graphData,
    hidePoints,
    tooltipPos,
    gradeBySubject,
    onDataPointClick,
    onChangeCategory,
    onChangeSelect,
  };
};
