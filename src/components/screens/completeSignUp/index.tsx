import React from 'react';
import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import NotoText from '@/components/atoms/text/notoText';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {resetNavigation} from '@/utils/rootNavigations';

const CompleteSignUp = () => {
  const onPressCheckBtn = () => {
    resetNavigation('login');
  };

  return (
    <ScreenBg
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: metrics.notchBottom,
      }}>
      <Icon name="phone-portrait-outline" size={60} color={color.main} />
      <NotoText fw="Bold" fs={ftSizes.l} mt={32} mb={23}>
        가입 신청 완료!
      </NotoText>
      <NotoText fw="Regular" fs={ftSizes.s}>
        캠퍼스 관리자 승인 후{'\n'}이용하실 수 있습니다.
      </NotoText>

      <RoundBoxBtn onPress={onPressCheckBtn} style={{position: 'absolute', bottom: metrics.notchBottom + 20}} title="확인" />
    </ScreenBg>
  );
};
export default CompleteSignUp;
