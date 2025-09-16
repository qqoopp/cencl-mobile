import {StyledTheme} from '@/../type';
import {metrics} from '@/theme/theme';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

export const arrowIconStyle = (isRight: boolean): ViewStyle => {
  return isRight
    ? {
        width: 32,
        height: 32,
        position: 'absolute',
        zIndex: 10,
        right: 10,
      }
    : {
        width: 32,
        height: 32,
        position: 'absolute',
        zIndex: 10,
        left: 10,
      };
};

export const xIconStyle: ViewStyle = {
  position: 'absolute',
  top: metrics.statusBarHeight + 12,
  left: 8,
  width: 32,
  height: 32,
  zIndex: 10,
};

export const Page = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  height: ${({theme: {metrics}}: StyledTheme) => metrics.screenHeight + 'px'};
  justify-content: center;
  align-items: center;
`;

export const MobileImage = styled.Image`
  width: ${({theme: {metrics}}: StyledTheme) =>
    metrics.screenWidth * 0.6 + 'px'};
  height: ${({theme: {metrics}}: StyledTheme) =>
    metrics.screenWidth * 1.2 + 'px'};
`;
