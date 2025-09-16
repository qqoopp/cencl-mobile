import React from 'react';
import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import NotoText from '@/components/atoms/text/notoText';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {ftSizes, metrics} from '@/theme/theme';
import {goBack} from '@/utils/rootNavigations';
import {hourglasses} from '@/assets/img';
import styled from 'styled-components/native';

const HourGlasses = styled.Image`
  width: 40px;
  height: 50px;
  margin: 0 0 20px 0;
`;

const WaitingAccept = () => {
  return (
    <ScreenBg
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: metrics.notchBottom,
      }}>
      <HourGlasses source={hourglasses} />
      <NotoText fw="Medium" fs={ftSizes.m} mb={10}>
        승인 대기 중입니다.
      </NotoText>
      <NotoText fw="Regular" fs={ftSizes.s}>
        자세한 내용은 캠퍼스 관리자에게 문의해주세요.
      </NotoText>
      <RoundBoxBtn onPress={goBack} style={{position: 'absolute', bottom: metrics.notchBottom + 20}} title="확인" />
    </ScreenBg>
  );
};
export default WaitingAccept;
