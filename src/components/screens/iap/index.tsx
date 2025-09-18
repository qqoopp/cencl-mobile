import {iap_contents, iap_title} from '@/assets/img';
import RoundBoxBtn from '@/components/atoms/btns/roundBoxBts';
import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {useIap} from '@/hooks/useIap';
import {color, ftSizes, metrics} from '@/theme/theme';
import React, {useEffect} from 'react';
import {ActivityIndicator, Image, ImageBackground, Modal, ScrollView, TouchableOpacity, View, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import FullScreenWebView from '@/components/blocks/fullScreenWebView';
import {calcResponsive} from '@/utils/responsiveSize';
import {navigate, navigationRef} from '@/utils/rootNavigations';
import AgeGate, {isModal} from '@components/blocks/modalContents/ageGate';

const screenStyle: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#611571',
};

const Iap = () => {
  const {modal, webviewUri, isPaying, onPressTerms, subscribe, isConnected} = useIap();

  return (
    <>
      {isPaying && (
        <View
          style={{
            position: 'absolute',
            flex: 1,
            left: 0,
            top: 0,
            zIndex: 10,
            backgroundColor: '#00000080',
            width: metrics.screenWidth,
            height: metrics.screenHeight + metrics.notchBottom + metrics.statusBarHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <ScreenBg style={screenStyle} barStyle="light-content">
        <TouchableOpacity
          onPress={() => {
            navigationRef.goBack();
          }}
          style={{width: '100%', right: 16}}>
          <NotoText ftColor={color.white} fs={ftSizes.l} style={{width: '100%', textAlign: 'right', alignSelf: 'flex-end'}}>
            닫기
          </NotoText>
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems: 'center'}}>
          <Col style={{alignItems: 'center', marginTop: calcResponsive(40)}}>
            <Image source={iap_title} />
            <NotoText mt={12} mb={8} fs={ftSizes.l} ftColor={color.white} style={{textAlign: 'center'}}>
              센트럴1리딩클럽 매니지먼트 시스템으로{'\n'}빈틈없는 자녀관리 시작하세요.
            </NotoText>
            <View style={{borderBottomWidth: 1, borderColor: color.white, marginBottom: 24}}>
              <NotoText fs={ftSizes.l} fw="Bold" ftColor={color.white} style={{textAlign: 'center'}}>
                월 12,900원
              </NotoText>
            </View>
            <View style={{borderBottomWidth: 1, borderColor: color.white, marginBottom: 24}}>
              <NotoText fs={ftSizes.xxs} fw="Bold" ftColor={color.white} style={{textAlign: 'center'}}>
                구독 중인 회원님만 본 서비스(App)를 이용할 수 있습니다.
              </NotoText>
            </View>
          </Col>
          <Image
            style={{width: metrics.singleWidth, height: metrics.singleWidth * 0.79, marginBottom: 20}}
            resizeMode="contain"
            source={iap_contents}
          />
          <Col>
            <RoundBoxBtn
              style={{alignSelf: 'center'}}
              isLoading={isConnected === false}
              disabled={isConnected === false}
              onPress={subscribe}
              title="구독하기"
              mb={10}
            />
            {[
              '구독 중인 회원님만 본 서비스를 이용할 수 있습니다.',
              '구독 기간 종료 전에 구독을 해지하지 않으면 자동으로 갱신됩니다.',
              '스토어 계정 설정으로 이동하여 언제든지 구독을 해지할 수 있습니다.',
            ].map(info => {
              return (
                <NotoText fs={ftSizes.xxs} ftColor={color.white} mb={2} key={'subinfo' + info}>
                  · {info}
                </NotoText>
              );
            })}
            <Row mb={24} mt={10}>
              <TouchableOpacity onPress={() => onPressTerms('https://cenman.co.kr/service_check.html')}>
                <NotoText ftColor={color.white} fs={ftSizes.xxs} mr={5}>
                  이용약관
                </NotoText>
              </TouchableOpacity>
              <NotoText ftColor={color.white} fs={ftSizes.xxs}>
                |
              </NotoText>
              <TouchableOpacity onPress={() => onPressTerms('https://cenman.co.kr/pipa.html')}>
                <NotoText ftColor={color.white} fs={ftSizes.xxs} ml={5}>
                  개인정보처리방침
                </NotoText>
              </TouchableOpacity>
            </Row>
          </Col>
        </ScrollView>
      </ScreenBg>
      <Modal visible={modal.isVisible} onRequestClose={modal.close}>
        {modal.type === 'webview' && <FullScreenWebView closeModal={modal.close} uri={webviewUri} />}
      </Modal>
      <AgeGate></AgeGate>
    </>
  );
};

export default Iap;
