import {Dimensions, Platform, StatusBar} from 'react-native';
import {isTablet} from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-safearea-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
const {width, height} = Dimensions.get('window');
const OS = Platform.OS;

export const ftSizes = {
  xxxs: 10,
  xxs: 12,
  xs: 14,
  s: 16,
  m: 18,
  l: 20,
  xl: 22,
  xxl: 24,
  xxxl: 26,
};

export const ftWeight = {
  light: '300',
  normal: '600',
  bold: '700',
  bolder: '900',
};

export const ftFamily = {
  Bold: 'NotoSansKR-Bold',
  Light: 'NotoSansKR-Light',
  Medium: 'NotoSansKR-Medium',
  Regular: 'NotoSansKR-Regular',
  Thin: 'NotoSansKR-Thin',
};
const arrange = {
  flexCenter: `
        align-items: center;
        justify-content: center;
    `,
};

export const color = {
  white: '#ffffff',
  main: '#971EB0',
  light_main: '#FAE4FF',
  //   sub: '#FF727D',
  //   light_sub: '#FFF7F7',
  dark_gray: '#99999999',
  gray: '#F2F2F2',
  light_gray: '#F7F7F7',
  black: '#222222',
  warn: '#FF727D',
};

export const metrics = {
  screenWidth: width,
  screenHeight: height,
  singleWidth: isTablet() ? 350 : width - 40,
  tabletWidth: width - 40,
  statusBarHeight: Platform.OS === 'android' ? (StatusBar.currentHeight === undefined ? 0 : StatusBar.currentHeight) : getStatusBarHeight(false),
  notchBottom: getBottomSpace(),
};

export const shadow = {
  shallow:
    OS === 'android'
      ? {elevation: 3}
      : {
          shadowColor: '#000',
          shadowOffset: {
            width: 1,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
        },
  normal:
    OS === 'android'
      ? {elevation: 6}
      : {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
        },
  deep:
    OS === 'android'
      ? {elevation: 9}
      : {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
        },
};

export const theme = {
  color,
  ftSizes,
  ftFamily,
  arrange,
  ftWeight,
  metrics,
  shadow,
};
