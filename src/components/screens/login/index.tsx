import React from 'react';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {logo} from '@/assets/img';
import UserInput from '@/components/atoms/inputs/userInput';
import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import {KeyboardAvoidingView, Platform, Pressable, Image, ActivityIndicator, Keyboard, TouchableWithoutFeedback} from 'react-native';
import NotoText from '@/components/atoms/text/notoText';
import Row from '@/components/blocks/view/row';
import {color, ftSizes, metrics} from '@/theme/theme';
import {checkIcon, Logo, styles} from './style';
import {useLogin} from './useLogin';
import Icon from 'react-native-vector-icons/Ionicons';
import Lottie from 'lottie-react-native';
import Col from '@/components/blocks/view/col';
import LoadingView from '@/components/blocks/view/loadingView';
import {isTablet} from 'react-native-device-info';

const Login = () => {
  const {id, pw, isKeepLogin, isLoading, isAcademyDevice, onPressLogin, onPressIsKeepLogin, onPressSignUp, onPressIsAcademyLogin} = useLogin();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? undefined : 'padding'} style={{flex: 1}}>
      <Pressable style={{flex: 1}} onPress={Keyboard.dismiss}>
        <ScreenBg style={styles.screenBg}>
          <Logo source={logo} style={{alignSelf: 'center'}} />
          <UserInput mt={32} mb={16} placeholder="아이디" {...id} />
          <UserInput placeholder="비밀번호" secureTextEntry {...pw} />

          <Col>
            <RoundBoxBtn onPress={onPressLogin} w={metrics.singleWidth} isLoading={isLoading} title="로그인" mt={16} mb={16} />
            <Pressable onPress={onPressIsKeepLogin}>
              <Row mb={6}>
                <Icon
                  size={24}
                  color={isKeepLogin ? color.main : color.dark_gray}
                  name={isKeepLogin ? 'checkmark-circle' : 'checkmark-circle-outline'}
                />
                <NotoText ml={2} ftColor={color.dark_gray}>
                  로그인 상태 유지
                </NotoText>
              </Row>
            </Pressable>
            {isTablet() && (
              <Pressable onPress={onPressIsAcademyLogin}>
                <Row mb={32}>
                  <Icon
                    size={24}
                    color={isAcademyDevice ? color.main : color.dark_gray}
                    name={isAcademyDevice ? 'checkmark-circle' : 'checkmark-circle-outline'}
                  />
                  <NotoText ml={2} ftColor={color.dark_gray}>
                    학원 기기에서 로그인
                  </NotoText>
                </Row>
              </Pressable>
            )}
          </Col>
          <Row style={{alignSelf: 'center'}}>
            <NotoText ftColor={color.dark_gray}>계정이 없으신가요?</NotoText>
            <Pressable onPress={onPressSignUp}>
              <NotoText ml={5} ftColor={color.main}>
                회원가입
              </NotoText>
            </Pressable>
          </Row>
        </ScreenBg>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

export default Login;
