import NotoText from '@/components/atoms/text/notoText';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes} from '@/theme/theme';
import React from 'react';
import {InfoBoard, styles} from './style';
import {Platform} from 'react-native';

const MngtSubscribe = () => {
  return (
    <ScreenBg style={styles.screen} isHeader isDivider headerTitle="구독 관리">
      <NotoText mt={20} fw="Medium" fs={ftSizes.m} mb={20}>
        구독 해지 안내
      </NotoText>
      <NotoText ftColor="#999999" fs={ftSizes.xs} mb={15}>
        자동결제를 원치 않으시면 구독 해지 혹은 구독 취소를 진 행해주세요.
        {'\n'}
        {'\n'}
        구독 해지 혹은 구독 취소 후에도 상품은 다음 만료일까지 정상적으로 사용할 수 있습니다.
      </NotoText>
      <InfoBoard>
        {Platform.OS === 'ios' ? (
          <NotoText ftColor="#9C9C9C">
            {`<구독 취소 방법>`}
            {'\n'}
            {`▶ 앱스토어(애플) : 설정 > 프로필 선택 > ‘구독’ 선택 > 센트럴1리딩클럽 > 구독 취소`}
          </NotoText>
        ) : (
          <NotoText ftColor="#9C9C9C">
            {`<구독 취소 방법>`}
            {'\n'}
            {`▶ 플레이스토어(구글) : 구글플레이 실행 > 프로필 선택 > '결제 및 정기 결제' 선택 > '정기 결제' 선택 > 센트럴1리딩클럽 > 구독 취소`}
          </NotoText>
        )}
      </InfoBoard>
    </ScreenBg>
  );
};

export default MngtSubscribe;
