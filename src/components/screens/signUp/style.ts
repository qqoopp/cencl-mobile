import {StyledTheme} from '@/../type';
import {StyledRoundBoxBtn} from '@/components/atoms/btns/roundBoxBts';
import NotoText, {StyledNotoText} from '@/components/atoms/text/notoText';
import {metrics, theme} from '@/theme/theme';
import {calcResponsive} from '@/utils/responsiveSize';
import {ViewStyle} from 'react-native';
import {isTablet} from 'react-native-device-info';
import styled from 'styled-components/native';

export const Page = styled.View`
  flex: 1;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  align-items: center;
`;

export const ContentsContainer = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => (isTablet() ? '400px' : metrics.singleWidth + 'px')};
  height: 100%;
  /* overflow: hidden; */
`;

export const InfoTitleBox = styled.View`
  flex: 3;
`;

export const InfoInputBox = styled.View`
  flex: 7;
`;

export const PointText = styled(NotoText)`
  font-size: ${({theme: {ftSizes}}: StyledTheme) => ftSizes.xxs + 'px'};
  color: ${({theme: {color}}: StyledTheme) => color.main};
  text-decoration: underline;
`;

export const selectorButtonStyle: ViewStyle = {
  //   width: calcResponsive(metrics.screenWidth - 90),
  width: '100%',
  borderRadius: 15,
  height: 48,
  overflow: 'hidden',
  paddingLeft: 15,
  alignItems: 'flex-start',
  justifyContent: 'center',
};

export const CampusButton = styled(StyledRoundBoxBtn)`
  flex: 1;
  align-self: center;
  width: 0;
  background-color: white;
`;

export const Warn = styled(StyledNotoText)`
  position: absolute;
  bottom: -20px;
`;

interface NextButtonProps extends StyledTheme {
  disabled: boolean;
}
export const NextButton = styled.TouchableOpacity`
  width: ${({theme: {metrics}}: NextButtonProps) => metrics.screenWidth + 'px'};
  background-color: ${({theme: {color}, disabled}: NextButtonProps) => (disabled ? color.light_main : color.main)};
  height: 56px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
`;

export const StoreIdMdBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  bottom: -30px;
  padding-vertical: 5px;
`;
