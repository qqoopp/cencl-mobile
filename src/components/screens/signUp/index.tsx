import React from 'react';
import Col from '@/components/blocks/view/col';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, ftSizes, metrics} from '@/theme/theme';
import {KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Divider from '@/components/atoms/divider';
import {ContentsContainer, InfoInputBox, InfoTitleBox, NextButton, Page, PointText, selectorButtonStyle, StoreIdMdBtn, Warn} from './style';
import Row from '@/components/blocks/view/row';
import NotoText from '@/components/atoms/text/notoText';
import UserInput from '@/components/atoms/inputs/userInput';
import {useSignUp} from './useSignUp';
import ModalSelector from 'react-native-modal-selector';
import {goBack} from '@/utils/rootNavigations';
import Icon from 'react-native-vector-icons/Entypo';
import StoreIdManual from '../modal/storeIdManual';
import ProgressBar from '@/components/atoms/progressBar';

import FullScreenWebView from '@/components/blocks/fullScreenWebView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import NotchView from '@/components/blocks/view/notchView';
import AgeGate from '@/components/blocks/modalContents/ageGate';

const infoFirstPage = [
  {
    title: '캠퍼스',
    isReuqire: true,
    type: 'button',
    placeholder: '캠퍼스',
    key: 'campus',
  },
  {
    title: '아이디',
    isReuqire: true,
    type: 'ascii-capable',
    placeholder: '아이디',
    warn: '영문,숫자 조합 5~16자리로 입력하세요.',
  },
  {
    title: '비밀번호',
    isReuqire: true,
    type: 'ascii-capable',
    placeholder: '비밀번호',
    warn: '영문,숫자 조합 5~16자리로 입력하세요.',
  },
  {
    title: '비밀번호 체크',
    isReuqire: false,
    type: 'ascii-capable',
    placeholder: '비밀번호 확인',
    warn: '비밀번호가 일치하지 않습니다.',
  },
];

const infoSecondPage = [
  {
    title: '휴대폰',
    isReuqire: true,
    type: 'phone-pad',
    placeholder: 'ex) 010-1234-5678',
  },
  {
    title: '전화번호',
    isReuqire: false,
    type: 'phone-pad',
    placeholder: 'ex) 02-1234-5678',
  },
  {
    title: '이메일',
    isReuqire: false,
    type: 'email-address',
    placeholder: 'ex) cen@example.com',
  },
  {
    title: '주소',
    isReuqire: false,
    type: 'ascii-capable',
    placeholder: '주소',
  },
];

const infoThirdPage = [
  {
    title: '이름',
    isReuqire: true,
    type: 'ascii-capable',
    placeholder: '학생 이름',
    warn: '이름을 한글로 입력해주세요.',
  },
  {
    title: '성별',
    isReuqire: true,
    type: 'button',
    placeholder: '성별',
    key: 'sex',
  },
  {
    title: '학교',
    isReuqire: false,
    type: 'ascii-capable',
    placeholder: '학교',
    warn: '학교명을 한글로 입력해주세요.',
  },
  {
    title: '학년',
    isReuqire: true,
    type: 'button',
    placeholder: '학년',
    key: 'grade',
  },
];

const infoFourthPage = [
  {
    title: '계정ID',
    isReuqire: true,
    type: 'email-address',
    placeholder: 'ex) cen@example.com',
  },
];
const grade = [
  {
    key: '초등',
    section: true,
    label: '초등',
    component: (
      <NotoText fw="Bold" fs={ftSizes.m} style={{alignSelf: 'center'}}>
        초등
      </NotoText>
    ),
  },
  {key: '초등 1학년', label: '초등 1학년'},
  {key: '초등 2학년', label: '초등 2학년'},
  {key: '초등 3학년', label: '초등 3학년'},
  {key: '초등 4학년', label: '초등 4학년'},
  {key: '초등 5학년', label: '초등 5학년'},
  {key: '초등 6학년', label: '초등 6학년'},
  {
    key: '중등',
    section: true,
    label: '중등',
    component: (
      <NotoText fw="Bold" fs={ftSizes.m} style={{alignSelf: 'center'}}>
        중등
      </NotoText>
    ),
  },
  {key: '중등 1학년', label: '중등 1학년'},
  {key: '중등 2학년', label: '중등 2학년'},
  {key: '중등 3학년', label: '중등 3학년'},
  {
    key: '고등',
    section: true,
    label: '고등',
    component: (
      <NotoText fw="Bold" fs={ftSizes.m} style={{alignSelf: 'center'}}>
        고등
      </NotoText>
    ),
  },
  {key: '고등 1학년', label: '고등 1학년'},
  {key: '고등 2학년', label: '고등 2학년'},
  {key: '고등 3학년', label: '고등 3학년'},
];
const sex = [
  {key: '남', label: '남'},
  {key: '여', label: '여'},
];

const SignUp = () => {
  const infosList = [infoFirstPage, infoSecondPage, infoThirdPage, infoFourthPage];

  const {scrollViewRef, signUpPageIndex, isCanNextPage, onPressLeftBtn, onPressNextBtn} = useSignUp();
  const {bottom} = useSafeAreaInsets();
  console.log('isCanNext : ', isCanNextPage);

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} style={{flex: 1}}>
        <AgeGate></AgeGate>
        <ScreenBg
          headerTitle="회원가입"
          onPressLeftBtn={onPressLeftBtn}
          onPressRightBtn={goBack}
          isHeader
          isHearRightBtn
          headerRightBtnText="취소"
          headerRightTextColor={color.main}>
          <ProgressBar width={metrics.screenWidth} height={3} percent={(signUpPageIndex + 1) * 20} />
          <ScrollView scrollEnabled={false} horizontal ref={scrollViewRef}>
            {infosList.map((infos, index) => {
              return <InfoPage key={'singUpPage' + index} infos={infos} />;
            })}
          </ScrollView>
          <NextButton disabled={!isCanNextPage} onPress={onPressNextBtn}>
            <NotoText fw="Bold" fs={ftSizes.m} ftColor={color.white}>
              계속하기
            </NotoText>
          </NextButton>
        </ScreenBg>
      </KeyboardAvoidingView>
      <NotchView />
    </>
  );
};

const InfoPage = ({
  infos,
}: {
  infos: {
    title: string;
    isReuqire: boolean;
    type: string;
    placeholder: string;
    warn?: string;
  }[];
}) => {
  const {onChangeText, onChangeSelector, onPressTermsBtn, uri, campuses, errors, modal} = useSignUp();

  console.log('errors : ', errors);

  const modalData = {
    campus: campuses,
    sex,
    grade,
  };

  return (
    <>
      <Page>
        <ContentsContainer>
          <NotoText fs={ftSizes.xl} mt={20} fw="Bold" mb={24}>
            기본 정보를 입력해주세요.
          </NotoText>
          {infos.map(info => {
            return (
              <Row key={info.title} style={{justifyContent: 'space-between'}} mb={16}>
                <InfoTitleBox>
                  <NotoText fs={ftSizes.m}>
                    {info.title !== '비밀번호 체크' && info.title}
                    {info.isReuqire && (
                      <NotoText fs={ftSizes.m} ftColor={color.warn}>
                        *
                      </NotoText>
                    )}
                  </NotoText>
                </InfoTitleBox>
                <InfoInputBox>
                  {info.type === 'button' ? (
                    <View style={{justifyContent: 'center'}}>
                      <ModalSelector
                        data={modalData[info.key]}
                        initValue={info.title}
                        closeOnChange
                        selectStyle={selectorButtonStyle}
                        onChange={option => onChangeSelector(option, info.title)}
                        optionContainerStyle={{maxHeight: 300}}
                      />
                      <Icon
                        name="triangle-down"
                        size={15}
                        color={color.dark_gray}
                        style={{
                          position: 'absolute',
                          right: 10,
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        marginBottom: errors.includes(info.title) && info.warn ? 16 : 0,
                      }}>
                      <UserInput
                        secureTextEntry={info.title === '비밀번호' || info.title === '비밀번호 체크'}
                        keyboardType={info.type}
                        onChangeText={text => onChangeText(text, info.title)}
                        placeholder={info.placeholder}
                        w={'100%'}
                      />
                      {errors.includes(info.title) && info.warn && (
                        <Warn fs={ftSizes.xxs} ftColor={color.warn} mt={8}>
                          {info.warn}
                        </Warn>
                      )}
                      {info.title === '계정ID' && (
                        <StoreIdMdBtn onPress={() => modal.changeType('appId')}>
                          <NotoText ftColor={color.main} fs={ftSizes.xxs}>
                            계정 ID를 모르시나요?
                          </NotoText>
                        </StoreIdMdBtn>
                      )}
                    </View>
                  )}
                </InfoInputBox>
              </Row>
            );
          })}
          {infos.length === 1 && (
            <NotoText
              style={{
                position: 'absolute',
                bottom: 65 + metrics.notchBottom,
                left: 20,
              }}
              ftColor={color.dark_gray}
              fs={ftSizes.xxs}>
              계정을 만들면&nbsp;
              <NotoText fs={ftSizes.xxs} ftColor={color.main}>
                만 14세 이상
              </NotoText>
              이며&nbsp;
              <TouchableOpacity onPress={() => onPressTermsBtn('service')}>
                <PointText>이용약관</PointText>
              </TouchableOpacity>
              &nbsp;및&nbsp;
              <TouchableOpacity onPress={() => onPressTermsBtn('privacy')}>
                <PointText>개인정보처리방침</PointText>
              </TouchableOpacity>
              에 동의한 것으로 간주합니다.
            </NotoText>
          )}
        </ContentsContainer>
      </Page>
      <Modal visible={modal.isVisible} onRequestClose={modal.close}>
        {modal.type === 'appId' && <StoreIdManual closeModal={modal.close} />}
        {modal.type === 'terms' && <FullScreenWebView closeModal={modal.close} uri={uri} />}
      </Modal>
    </>
  );
};

export default SignUp;
