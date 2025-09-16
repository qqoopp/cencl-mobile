import {Dimensions} from 'react-native';
import {responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize} from 'react-native-responsive-dimensions';

const VIEW_PORT_WIDTH = 360;
const VIEW_PORT_HEIGHT = 760;

const {width} = Dimensions.get('window');

const standardWidth = 480;

export const calcResponsive = (size: number) => {
  const responsiveSize = (size * width) / standardWidth;
  return responsiveSize >= size ? size : responsiveSize;
};

export function widthPercentage(width: number): number {
  const percentage = (width / VIEW_PORT_WIDTH) * 100;
  return responsiveScreenWidth(percentage);
}

export function heightPercentage(height: number): number {
  const percentage = (height / VIEW_PORT_HEIGHT) * 100;
  return responsiveScreenHeight(percentage);
}
export function fontPercentage(size: number): number {
  const percentage = size * 0.135;

  return responsiveScreenFontSize(percentage);
}
