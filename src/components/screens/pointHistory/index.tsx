import {coin} from '@/assets/img';
import Divider from '@/components/atoms/divider';
import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import React from 'react';
import {FlatList} from 'react-native';
import {MyPointBox, PointImage, UsePointRecord} from './style';
import {usePointHistory} from './usePointHistory';

const PointHistory = () => {
  const {member, pointHistoryList} = usePointHistory();
  console.log('mem_point : ', member.mem_point);
  return (
    <ScreenBg isDivider isHeader headerTitle="포인트 적립/사용 내역">
      <Divider h={1} />
      <MyPointBox>
        <PointImage source={coin} />
        <NotoText fs={ftSizes.m} mt={16} mb={8}>
          보유 포인트
        </NotoText>
        <NotoText fs={ftSizes.l} ftColor={color.main} fw="Bold">
          {member.mem_point.toLocaleString()} 포인트
        </NotoText>
      </MyPointBox>
      <Divider />
      <NotoText fw="Medium" fs={ftSizes.m} ml={20} mt={15} mb={15}>
        이용내역
      </NotoText>
      <Divider h={1} />
      <FlatList
        contentContainerStyle={{paddingBottom: metrics.notchBottom}}
        data={pointHistoryList}
        renderItem={({item, index}) => {
          return (
            <UsePointRecord key={item.seq_num}>
              <Col>
                <NotoText mb={8}>{item.comment}</NotoText>
                <NotoText fs={ftSizes.xs} ftColor={color.dark_gray}>
                  {item.check_time}
                </NotoText>
              </Col>
              <NotoText fw="Medium" ftColor={item.point >= 0 ? '#FF727D' : '#0095FF'}>
                {item.point.toLocaleString('ko-KR')} 포인트
              </NotoText>
            </UsePointRecord>
          );
        }}
      />
    </ScreenBg>
  );
};

export default PointHistory;
