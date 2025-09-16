import React from 'react';
import ScreenBg from '@/components/blocks/bg/screenBg';
import NotoText from '@/components/atoms/text/notoText';
import HeaderBox from '@/components/blocks/headerBox';
import {color, ftSizes, metrics, shadow} from '@/theme/theme';
import {LineChart} from 'react-native-chart-kit';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {widthPercentage} from '@/utils/responsiveSize';
import {Line, Rect, Svg, Text} from 'react-native-svg';
import {ChartConfig} from 'react-native-chart-kit/dist/HelperTypes';
import Divider from '@/components/atoms/divider';
import Col from '@/components/blocks/view/col';
import NoLineDropDownPicker from '@/components/atoms/noLineDropDownPicker';
import {goBack} from '@/utils/rootNavigations';
import LearningCategoryRow from '@/components/blocks/learningCategoryRow';
import {useReport} from './useReport';
import {ValueRow} from './style';
import VIcon from '@/components/atoms/vIcon';

const emptyData = {
  labels: [
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
  ],
  datasets: [
    {
      data: [0],
      strokeWidth: 3, // optional
      color: () => 'transparent',
    },
    {
      data: [100],
      strokeWidth: 3, // optional
      color: () => 'transparent',
    },
  ],
};

const chartConfig: ChartConfig = {
  fillShadowGradientOpacity: 0,
  backgroundColor: 'transparent',
  color: (opacity = 0) => `rgba(134, 65, 244, ${opacity})`,
  labelColor: (opacity = 1) => color.black,
  strokeWidth: 1,

  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  backgroundGradientFromOpacity: 0,
  backgroundGradientToOpacity: 0,
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
};

const Report = () => {
  const {
    report,
    nowCategory,
    dropDownMonthList,
    graphData,
    hidePoints,
    tooltipPos,
    gradeBySubject,
    onChangeCategory,
    onChangeSelect,
    onDataPointClick,
  } = useReport();

  return (
    <ScreenBg>
      <HeaderBox
        first={
          <TouchableOpacity onPress={goBack}>
            <VIcon type="Octicons" name="x" size={25} />
          </TouchableOpacity>
        }
        second={<NoLineDropDownPicker onChangeValue={onChangeSelect} itemList={dropDownMonthList} />}
      />
      {/* <NoLineDropDownPicker onChangeValue={onChangeSelect} itemList={dropDownMonthList} /> */}
      <LearningCategoryRow type="report" onChangeCategory={onChangeCategory} />
      <Divider />
      {nowCategory !== 'Voca' && (
        <NotoText fw="Medium" fs={ftSizes.s} mt={20} ml={20} mb={15}>
          {nowCategory === 'Reading' && '독서 퀴즈 점수'}
          {nowCategory === 'Speaking' && 'Speaking 점수'}
          {nowCategory === 'Writing' && 'Writing 점수'}
        </NotoText>
      )}
      {['Reading', 'Speaking', 'Writing'].includes(nowCategory) && graphData && graphData[nowCategory] && (
        <View style={{alignItems: 'center', transform: [{translateX: -widthPercentage(15)}]}}>
          <View style={{position: 'absolute', top: 0, left: 0, alignItems: 'center'}}>
            <LineChart
              data={emptyData}
              width={metrics.screenWidth}
              height={220}
              withDots={false}
              withVerticalLines={false}
              formatXLabel={xValue => {
                return xValue === '10' || xValue === '20' || xValue === '30' ? xValue : '';
              }}
              withOuterLines={false}
              withInnerLines={false}
              withHorizontalLabels={false}
              fromZero={true}
              style={{alignSelf: 'center'}}
              chartConfig={chartConfig}
              decorator={() => {
                return (
                  nowCategory === 'Reading' && (
                    <Svg>
                      <Line x1={65} y1={66} x2={metrics.screenWidth} y2={66} stroke="red" strokeWidth={1} />
                    </Svg>
                  )
                );
              }}
            />
          </View>
          <LineChart
            data={graphData[nowCategory]}
            width={metrics.screenWidth}
            height={220}
            withVerticalLines
            withHorizontalLines
            xLabelsOffset={5}
            withOuterLines={false}
            withInnerLines={true}
            withHorizontalLabels={true}
            formatXLabel={xValue => {
              return '';
            }}
            style={{alignSelf: 'center'}}
            chartConfig={chartConfig}
            hidePointsAtIndex={hidePoints[nowCategory]}
            withShadow={false}
            decorator={() => {
              return tooltipPos.visible ? (
                <View style={[shadow.normal]}>
                  <Svg>
                    <Rect
                      rx={8}
                      x={tooltipPos.index > 28 ? tooltipPos.x - 40 : tooltipPos.x - 25}
                      y={tooltipPos.y + 10}
                      width="50"
                      height="45"
                      fill="white"
                    />
                    <Text
                      x={tooltipPos.index > 28 ? tooltipPos.x - 20 : tooltipPos.x - 4}
                      y={tooltipPos.y + 28}
                      fill="black"
                      fontSize="10"
                      textAnchor="middle">
                      {tooltipPos.index + 1}일
                    </Text>
                    <Text
                      x={tooltipPos.index > 28 ? tooltipPos.x - 15 : tooltipPos.x}
                      y={tooltipPos.y + 45}
                      fill="black"
                      fontSize="14"
                      fontWeight="bold"
                      textAnchor="middle">
                      {tooltipPos.value}
                    </Text>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={onDataPointClick}
          />
        </View>
      )}

      {nowCategory === 'Comment' ? (
        <ScrollView style={{marginLeft: 10, marginRight: 10}}>
          <NotoText ml={20} ftColor={report?.comment ? color.black : color.dark_gray}>
            {report?.comment ?? '내용이 없습니다.'}
          </NotoText>
        </ScrollView>
      ) : (
        ['Reading', 'Speaking', 'Writing', 'Voca'].includes(nowCategory) &&
        gradeBySubject &&
        gradeBySubject[nowCategory]?.map(({title, value}, index) => (
          <Col key={title + index}>
            <ValueRow>
              <NotoText>{title}</NotoText>
              <NotoText>{value}</NotoText>
            </ValueRow>
            <Divider h={1} />
          </Col>
        ))
      )}
    </ScreenBg>
  );
};

export default Report;
