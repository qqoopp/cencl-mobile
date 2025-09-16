import {certificationMark, splash_kid, splash_title} from '@/assets/img';
import ScreenBg from '@/components/blocks/bg/screenBg';
import React from 'react';
import {Image} from 'react-native';
import {CertifiactionMarkImage, CertificationMarkView, KidImage, styles, Title} from './style';
import {useSplash} from './useSplash';
import NotchView from '@/components/blocks/view/notchView';

const Splash = () => {
  useSplash();

  return (
    <ScreenBg style={styles.bgScreen}>
      <Title source={splash_title} resizeMode="contain" />
      <KidImage source={splash_kid} resizeMode="contain" />
      <CertificationMarkView>
        <CertifiactionMarkImage source={certificationMark} />
        <NotchView bgColor="transparent" />
      </CertificationMarkView>
    </ScreenBg>
  );
};

export default Splash;
