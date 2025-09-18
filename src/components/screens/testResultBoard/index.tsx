import React, {useEffect, useState} from 'react';
import ScreenBg from '@/components/blocks/bg/screenBg';
import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import {ResultBox, styles} from './style';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import NotoText from '@/components/atoms/text/notoText';
import {color, ftSizes} from '@/theme/theme';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '@/navigations/rootStack';
import Divider from '@/components/atoms/divider';
import {View} from 'react-native';
import NotchView from '@/components/blocks/view/notchView';
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import {StyledTheme} from '@/../type';
import {playSoundEffect} from '@/utils/playSoundEffect';
import {goBack} from '@/utils/rootNavigations';

type Props = StackScreenProps<RootStackParams, 'testResultBoard'>;

const JalnanText = styled.Text`
  font-family: 'JalnanOTF';
  font-size: 24px;
  color: ${({theme: {color}}: StyledTheme) => color.main};
  margin: 10px 0 28px 0;
  text-align: center;
  line-height: 30px;
`;

const resultTexts = ['Well done', 'Good', 'Very good', 'Fantastic', 'Excellent~!\nYou are the best~!'];

const TestResultBoard = ({
  route: {
    params: {score, seconds, type},
  },
}: Props) => {
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    playSoundEffect();

    if (score === '-') {
      setResultText(resultTexts[1]);
    } else if (type === 'rft') {
      getTextFromScore(Number(score));
    } else {
      setResultText(resultTexts[4]);
    }
  }, []);

  const getTextFromScore = (score: number) => {
    if (score < 60) {
      setResultText(resultTexts[0]);
    } else if (score < 70) {
      setResultText(resultTexts[1]);
    } else if (score < 80) {
      setResultText(resultTexts[2]);
    } else if (score < 90) {
      setResultText(resultTexts[3]);
    } else {
      setResultText(resultTexts[4]);
    }
  };

  return (
    <ScreenBg style={styles.screen}>
      <LottieView style={styles.animation} source={require('../../../assets/free.json')} autoPlay loop />
      <JalnanText>{resultText}</JalnanText>
      <ResultBox type={type}>
        <Col>
          <Row style={styles.resultRow}>
            <NotoText fw="Medium" fs={ftSizes.s}>
              {type === 'voca' ? '맞힌 갯수' : '읽기 정확도'}
            </NotoText>
            <NotoText fw="Medium" fs={ftSizes.s} ftColor={color.dark_gray}>
              {type === 'recording' ? '지원하지 않는 도서입니다.' : score}
            </NotoText>
          </Row>
          <Divider mb={10} mt={10} w={'100%'} h={1} />
          <Row style={styles.resultRow}>
            <NotoText fs={ftSizes.s} fw="Medium">
              {type === 'voca' ? '소요 시간' : '학습 시간'}
            </NotoText>
            <NotoText fw="Medium" fs={ftSizes.s} ftColor={color.dark_gray}>
              {new Date(Number(seconds) * 1000).toISOString().substring(14, 19)}
            </NotoText>
          </Row>
        </Col>
      </ResultBox>
      <View style={styles.button}>
        <RoundBoxBtn title="확인" onPress={goBack} />
        <NotchView />
      </View>
    </ScreenBg>
  );
};

export default TestResultBoard;
