import NotoText from '@/components/atoms/text/notoText';
import HeaderBox from '@/components/blocks/headerBox';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics, shadow} from '@/theme/theme';
import React, {useState} from 'react';
import OIcon from 'react-native-vector-icons/Octicons';
import {LineChart} from 'react-native-chart-kit';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Rect, Svg, Text} from 'react-native-svg';
import {useReadingSkillResults} from './useReadingSkillResults';
import {ChartConfig} from 'react-native-chart-kit/dist/HelperTypes';
import Divider from '@/components/atoms/divider';
import Row from '@/components/blocks/view/row';
import Col from '@/components/blocks/view/col';
import AICon from 'react-native-vector-icons/AntDesign';
import {GEInfoBox, InfoBtn, TableBox} from './style';
import NoLineDropDownPicker from '@/components/atoms/noLineDropDownPicker';
import {goBack} from '@/utils/rootNavigations';
import {widthPercentage} from '@/utils/responsiveSize';
import EmptyComponent from '@/components/blocks/emptyComponent';

const emptyData = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
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

const ReadingSkillResults = () => {
  const {srtests, graphData, hidePoints, yearList, tooltipPos, isShowGeInfo, onDataPointClick, onPressGeInfoBtn, onChangeYear} =
    useReadingSkillResults();

  console.log('gradphData [ ', graphData?.datasets, ' ] ');
  console.log('hidePoints [ ', hidePoints, ' ]');
  console.log('tooltipspost [ ', tooltipPos, ' ] ');
  return (
    <ScreenBg>
      <HeaderBox
        first={
          <TouchableOpacity onPress={goBack}>
            <OIcon name="x" size={25} />
          </TouchableOpacity>
        }
        second={<NoLineDropDownPicker onChangeValue={onChangeYear} itemList={yearList} />}
      />
      {graphData && (
        <View style={{alignItems: 'center', transform: [{translateX: -widthPercentage(15)}]}}>
          <View style={{position: 'absolute', top: 0, left: 0, alignItems: 'center'}}>
            <LineChart
              data={emptyData}
              width={metrics.screenWidth}
              height={220}
              withDots={false}
              withVerticalLines={false}
              xAxisLabel="월"
              withOuterLines={false}
              withInnerLines={false}
              withHorizontalLabels={true}
              fromZero={true}
              style={{alignSelf: 'center'}}
              chartConfig={chartConfig}
            />
          </View>
          <LineChart
            data={graphData}
            width={metrics.screenWidth}
            height={220}
            withVerticalLines
            xAxisLabel="월"
            withOuterLines={false}
            withInnerLines={false}
            withHorizontalLabels={true}
            style={{alignSelf: 'center'}}
            chartConfig={chartConfig}
            hidePointsAtIndex={hidePoints}
            withShadow={false}
            decorator={() => {
              return tooltipPos.visible ? (
                <View style={[shadow.normal]}>
                  <Svg>
                    <Rect rx={8} x={tooltipPos.x - 25} y={tooltipPos.y + 10} width="50" height="45" fill="white" />
                    <Text x={tooltipPos.x - 4} y={tooltipPos.y + 28} fill="black" fontSize="10" textAnchor="middle">
                      {tooltipPos.index + 1}월
                    </Text>
                    <Text x={tooltipPos.x} y={tooltipPos.y + 45} fill="black" fontSize="14" fontWeight="bold" textAnchor="middle">
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
      <Divider />
      <Col style={{alignSelf: 'center', width: metrics.tabletWidth, zIndex: 10}}>
        <Row>
          {['시험일', 'GE', 'IRL', 'ZPD'].map(title => {
            return (
              <TableBox key={'title' + title}>
                <NotoText fw="Medium" ftColor="#999999">
                  {title}
                </NotoText>
                {title === 'GE' && (
                  <InfoBtn onPress={onPressGeInfoBtn}>
                    <AICon name="questioncircleo" size={13} color={'#999999'} />
                  </InfoBtn>
                )}
              </TableBox>
            );
          })}
          {isShowGeInfo && (
            <GEInfoBox>
              <Col>
                <NotoText fs={ftSizes.xxs} ftColor={color.white} mr={10}>
                  GE점수란 Grade Equivalent의 약자로 미국 현지 학생과 비교한 영어 읽기 레벨이에요. Ex) GE 3.3 : 미국 3학년 3개월 학생이 읽는 수준
                </NotoText>
              </Col>
              <TouchableOpacity onPress={onPressGeInfoBtn}>
                <OIcon name="x" size={20} color={color.white} />
              </TouchableOpacity>
            </GEInfoBox>
          )}
        </Row>
      </Col>
      <FlatList
        data={srtests}
        ListEmptyComponent={<EmptyComponent />}
        renderItem={({item, index}) => {
          const {sr_date, sr_ge, sr_irl, sr_zpd} = item;
          return (
            <Col style={{alignSelf: 'center', width: metrics.tabletWidth}}>
              <Row>
                {[sr_date, sr_ge, sr_irl, sr_zpd].map((value, index) => {
                  return (
                    <TableBox key={'value' + value + index}>
                      <NotoText fw="Medium">{value}</NotoText>
                    </TableBox>
                  );
                })}
              </Row>
              <Divider h={1} />
            </Col>
          );
        }}
      />
    </ScreenBg>
  );
};

export default ReadingSkillResults;
