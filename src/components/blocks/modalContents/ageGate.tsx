import ShadowCard from '@/components/atoms/card/shadowCard';
import OneText from '@/components/atoms/texts/oneText';
import React, {useEffect, useRef, useState} from 'react';
import {Animated, ScrollView, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import {StyledTheme} from '../../../../type';
import {calcResponsive} from '@/utils/responsiveSize';
import {button_del} from '@/assets/img';
import {useAtom, useAtomValue} from 'jotai';
import WidthHeader from '@/components/blocks/view/widthHeader';
import modalStates from '@/atoms/modalStates';
import {getDate} from '@/utils/getDate';
import {shake} from '@/utils/animation';
import Box from '@/components/atoms/box';
import {useRootModal} from '@/hooks/useRootModal';
import SFXButton from '@/components/atoms/buttons/sfxButton';
import {useIsFocused} from '@react-navigation/native';

const Bg = styled.View`
  display: flex;
  flex-direction: row;
  background-color: #e3e5f5;
  height: ${({theme: {metrics}}: StyledTheme) => metrics.screenHeight + 'px'};
`;

const DelButton = styled.Image`
  width: 40px;
  height: 28px;
`;

const PasswordBox = styled.View`
  background-color: #ffffff60;
  padding: 7px 26px;
  margin: 0 0 40px 0;
  align-items: center;
  flex-direction: row;
`;

const InputBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  height: 50px;
`;

const NumInput = styled.View`
  width: 40px;
  justify-content: center;
  align-items: center;
  border-bottom-width: 2px;
  border-color: #43536c;
  padding-bottom: 2px;
  margin: 0 10px;
`;

const numToDigit = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE'];

function generateRandom4DigitNumber() {
  return Math.floor(1000 + Math.random() * 9000); // 1000부터 9999까지의 범위
}

const AgeGate = () => {
  const [modal, setModal] = useAtom(modalStates);
  const [pw, setPw] = useState('');
  const [inputNum, setInputNum] = useState('');
  const [isModal, setIsmodal] = useState(true);
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const {close} = useRootModal();

  useEffect(() => {
    setInputNum('');
  }, [useIsFocused]);

  useEffect(() => {
    if (inputNum.length === 4) {
      checkPw(Number(inputNum));
    }
  }, [inputNum]);

  const checkPw = (userBirth: number) => {
    const {year} = getDate();
    const isPass = year - userBirth > 14;

    if (isPass) {
      modal.onSuccessGate();
      setIsmodal(false);
      //   setModal(prev => {
      //     return {...prev, onSuccessGate: () => {}};
      //   });
      close();
    } else {
      shake(shakeAnim);
      setTimeout(close, 500);
    }
  };

  const onPressNum = (num: number) => {
    if (inputNum.length < 4) {
      setInputNum(inputNum + num);
    }
  };

  const onPressDel = () => {
    if (inputNum.length > 0) {
      setInputNum(inputNum.substring(0, inputNum.length - 1));
    }
  };

  return (
    <>
      {isModal && (
        <Animated.View style={{zIndex: 100, transform: [{translateX: shakeAnim}]}}>
          <ScrollView style={{backgroundColor: '#e3e5f5'}}>
            <WidthHeader onPressBackButton={close} backBtn bgColor="#e3e5f5" />
            <Bg style={{flexDirection: 'column'}}>
              <Box col center flex={1}>
                <OneText fm="title" fs={20} ftColor="#43536C" mb={16}>
                  {'보호자 전용'}
                </OneText>
                <OneText fm="title" fs={16} ftColor="#43536C" mb={16}>
                  {'출생 연도를 입력해주세요.'}
                </OneText>
                <PasswordBox style={{opacity: 0}}>
                  {pw.split('').map((num, index) => {
                    return (
                      <OneText fs={16} fm="pop" key={`pw${index}`}>
                        {` ${numToDigit[Number(num)]}`}
                        {index < 3 && ','}
                      </OneText>
                    );
                  })}
                </PasswordBox>
                <InputBox>
                  {new Array(4).fill('').map((_, index) => {
                    return (
                      <NumInput key={`inputNum${index}`}>
                        <OneText fs={16}>{inputNum.split('')[index]}</OneText>
                      </NumInput>
                    );
                  })}
                  <SFXButton onPress={onPressDel}>
                    <DelButton source={button_del} />
                  </SFXButton>
                </InputBox>
              </Box>
              <Box col center flex={1}>
                {[
                  [1, 2, 3],
                  [4, 5, 6],
                  [7, 8, 9],
                  ['', 0, ''],
                ].map((nums, index) => {
                  return (
                    <Box row mb={10} key={`keyPadRow${index}`}>
                      {nums.map((num, index) => {
                        return (
                          <SFXButton
                            key={`${`keyPad${index}`}`}
                            onPress={() => typeof num === 'number' && onPressNum(num)}
                            disabled={num === ''}
                            style={{marginHorizontal: 5, opacity: num === '' ? 0 : 1}}>
                            <ShadowCard w={56} h={56} r={8} isCenter>
                              <OneText fs={28}>{num}</OneText>
                            </ShadowCard>
                          </SFXButton>
                        );
                      })}
                    </Box>
                  );
                })}
              </Box>
            </Bg>
          </ScrollView>
        </Animated.View>
      )}
    </>
  );
};

export default AgeGate;
