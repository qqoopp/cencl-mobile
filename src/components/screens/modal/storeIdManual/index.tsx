import {manual_aos_1p, manual_aos_2p, manual_ios_1p, manual_ios_2p} from '@/assets/img';
import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {ftSizes, metrics} from '@/theme/theme';
import {IconButton} from '@react-native-material/core';
import React, {useEffect, useRef, useState} from 'react';
import {Image, Platform, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {arrowIconStyle, Page, xIconStyle} from './style';
import {MobileImage} from './style';

interface Props {
  closeModal: () => void;
}

const StoreIdManual = ({closeModal}: Props) => {
  const [page, setPage] = useState(0);

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current !== null) {
      scrollViewRef.current.scrollTo({
        x: metrics.screenWidth * page,
      });
    }
  }, [page]);

  return (
    <ScreenBg style={{width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <IconButton onPress={closeModal} style={xIconStyle} icon={props => <FeatherIcon name="x" {...props} size={32} />} />
      <IconButton onPress={() => setPage(0)} style={arrowIconStyle(false)} icon={props => <Icon name="arrow-left" {...props} />} />
      <ScrollView ref={scrollViewRef} horizontal pagingEnabled scrollEnabled={false}>
        <Page>
          <MobileImage resizeMode="contain" source={Platform.OS === 'android' ? manual_aos_1p : manual_ios_1p} />
          <Col style={{alignItems: 'center'}}>
            <NotoText fs={ftSizes.m} mt={45}>
              1
            </NotoText>
            <NotoText style={{textAlign: 'center'}} fs={ftSizes.m} mt={25}>
              앱스토어에 접속하여{'\n'}우측 상단 프로필 클릭
            </NotoText>
          </Col>
        </Page>
        <Page>
          <MobileImage resizeMode="contain" source={Platform.OS === 'android' ? manual_aos_2p : manual_ios_2p} />
          <Col style={{alignItems: 'center'}}>
            <NotoText fs={ftSizes.m} mt={45}>
              2
            </NotoText>
            <NotoText style={{textAlign: 'center'}} fs={ftSizes.m} mt={25}>
              상단 계정 이름 아래{'\n'}이메일 주소 확인
            </NotoText>
          </Col>
        </Page>
      </ScrollView>
      <IconButton onPress={() => setPage(1)} style={arrowIconStyle(true)} icon={props => <Icon name="arrow-right" {...props} />} />
    </ScreenBg>
  );
};

export default StoreIdManual;
