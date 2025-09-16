import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {navigate} from '@/utils/rootNavigations';
import {NextBtn} from './style';

const pushTypes = ['공지사항 게시 알림', '출석 및 학습 시작 알림', '성적표 게시 알림', '원비 결제일 알림'];

const RequestPush = () => {
  const onPressNextBtn = () => {
    navigate('completeSignUp');
  };

  const onPressTurnOnPush = () => {
    navigate('completeSignUp');
  };

  return (
    <ScreenBg
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: metrics.notchBottom + 20,
      }}>
      <NextBtn onPress={onPressTurnOnPush}>
        <NotoText ftColor={color.main}>나중에</NotoText>
      </NextBtn>
      <NotoText mt={70 + metrics.statusBarHeight} fs={ftSizes.m} style={{textAlign: 'center'}} fw="Bold" mb={16}>
        알림 기능을 켜주세요.{'\n'}아래 상황에 맞춰 알려드릴게요.
      </NotoText>
      <Icon name="bell-badge-outline" size={150} color={color.main} />
      <Col>
        {pushTypes.map(push => {
          return (
            <NotoText fw="Regular" mb={16} key={push}>
              · {push}
            </NotoText>
          );
        })}
      </Col>
      <RoundBoxBtn onPress={onPressTurnOnPush} title="알림 기능 켜기" />
    </ScreenBg>
  );
};

export default RequestPush;
