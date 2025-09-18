import Divider from '@/components/atoms/divider';
import NotoText from '@/components/atoms/text/notoText';
import Title from '@/components/atoms/text/title';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {RootStackParams} from '@/navigations/rootStack';
import {color, ftSizes, metrics, shadow} from '@/theme/theme';
import {navigate} from '@/utils/rootNavigations';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Modal, ScrollView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SIcon from 'react-native-vector-icons/SimpleLineIcons';

import {ConsultingButton, IconBox, InfoRowBtn, LeftClassBoard, styles} from './style';
import {useParentsPage} from './useParentsPage';
import FullScreenWebView from '@/components/blocks/fullScreenWebView';
import VIcon from '@/components/atoms/vIcon';
import Rank from '@/components/modals/rank';

const ParentsPage = () => {
  const {member, modal, uri, onPressRow, onPressLogout} = useParentsPage();

  console.log('member : ', member);

  const parentsInfos = [
    {
      title: '자녀 관리',
      list: [
        {title: '랭킹 조회', screen: 'rank', url: '', isHide: member.menu_buse_rank !== '사용'},
        {title: '학습 이력 조회', screen: 'learningHistory', isHide: false},
        {title: '읽기 능력 평가(SR테스트) 결과', screen: 'readingSkillResults', isHide: false},
        {title: '성적표', screen: 'report', isHide: false},
        {title: '성장 과정', screen: 'growthHistory', isHide: false},
      ],
    },
    {
      title: '결제 관리',
      list: [
        {
          title: '수강료 납부',
          screen: '',
          url: 'https://www.cenman.co.kr/_utils/nicepay/payRequest_mobile_utf.php?mem_id=' + member.mem_id,
          isHide: member.menu_buse_cart !== '사용',
        },
        {title: '포인트 적립/사용 내역', screen: 'pointHistory', isHide: member.menu_buse_point !== '사용'},
        ,
        {title: '구독 관리', screen: 'mngtSubscribe', isHide: false},
      ],
    },
    {
      title: '정보',
      list: [
        {title: '회원 정보', screen: 'memberInfo', isHide: false},
        {title: '이용약관', screen: '', url: 'https://cenman.co.kr/service_check.html', isHide: false},
        {title: '개인정보 처리방침', screen: '', url: 'https://cenman.co.kr/pipa.html', isHide: false},
        {title: '오픈소스 라이선스', screen: '', url: 'https://cenman.s3.ap-northeast-2.amazonaws.com/info/openSourceLicense.html', isHide: false},
      ],
    },
  ];

  return (
    <>
      <ScreenBg isStatusBarUse>
        <ScrollView contentContainerStyle={styles.scrolConentContainer}>
          <View style={styles.titleBox}>
            <Title mt={15} mb={15}>
              학부모 페이지
            </Title>
          </View>
          <LeftClassBoard>
            <Row>
              <IconBox>
                <Icon name="briefcase" size={25} color={color.white} />
              </IconBox>
              <NotoText fs={ftSizes.s} ftColor={color.dark_gray}>
                {member.class_division === '회차' ? `잔여 수업 기간(회차)` : `다음 결제 일`}
              </NotoText>
            </Row>
            {member.class_division === '회차' ? (
              <NotoText fs={ftSizes.s}>{member.result_class_month_round} 회차</NotoText>
            ) : (
              <NotoText fs={ftSizes.s}>{member.next_period_date.split('-').join('.')}</NotoText>
            )}
          </LeftClassBoard>
          <Divider mb={16} />
          {parentsInfos.map(infos => {
            return (
              <Col key={infos.title}>
                <Col style={{alignSelf: 'center'}}>
                  <NotoText fs={ftSizes.m} fw="Medium">
                    {infos.title}
                  </NotoText>
                  {infos.list.map(info => {
                    return (
                      info?.isHide === false && (
                        <Col key={infos.title + info?.title}>
                          <InfoRowBtn onPress={() => onPressRow(info)}>
                            <NotoText>{info?.title}</NotoText>
                            <SIcon size={16} color={color.dark_gray} name="arrow-right" />
                          </InfoRowBtn>
                          <Divider h={1} w={metrics.singleWidth} />
                        </Col>
                      )
                    );
                  })}
                </Col>
                <Divider mb={16} />
              </Col>
            );
          })}
          <TouchableOpacity onPress={onPressLogout}>
            <NotoText mt={12} mb={12} ftColor={color.warn}>
              로그아웃
            </NotoText>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity style={{position: 'absolute', right: 15, bottom: metrics.notchBottom + 90}} onPress={() => navigate('consulting')}>
          <ConsultingButton style={shadow.shallow}>
            <VIcon type="Feather" name="headphones" size={15} color={color.main} />
            <NotoText fs={ftSizes.xxs} fw="Medium" ftColor={color.main}>
              상담
            </NotoText>
          </ConsultingButton>
        </TouchableOpacity>
      </ScreenBg>
      <Modal visible={modal.isVisible} onRequestClose={modal.close}>
        {modal.type === 'webView' && <FullScreenWebView closeModal={modal.close} uri={uri} />}
        {modal.type === 'rank' && (
          <View style={{backgroundColor: '#00000099', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 0.2}}></View>
            {modal.type === 'rank' && <Rank closeMoal={modal.close} />}
            <View style={{flex: 0.2}}></View>
            {/* <Image style={{width: metrics.screenWidth, height: calcResponsive(metrics.screenHeight)}} resizeMode="contain" source={{uri: imgUri}} /> */}
          </View>
        )}
      </Modal>
    </>
    //   "https://www.cenman.co.kr/_utils/nicepay/payRequest_mobile_utf.php?mem_id=student22#"
  );
};

export default ParentsPage;
