import {StyledTheme} from '@/../type';
import {color, ftSizes, ftWeight, metrics} from '@/theme/theme';
import React, {ReactNode} from 'react';
import {ActivityIndicator, ColorSchemeName, ColorValue, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';
import NotoText from '../text/notoText';

interface RoundBoxBtnStyle extends StyledTheme {
  bgColor: string;
  borderColor: string;
  w: number;
  h: number;
  r?: number;
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
}

export const StyledRoundBoxBtn = styled.TouchableOpacity`
  height: ${({theme: {metrics}, h}: RoundBoxBtnStyle) => h ?? '56px'};
  flex-direction: row;
  width: ${({theme: {metrics}, w}: RoundBoxBtnStyle) => (w ? w + 'px' : metrics.tabletWidth + 'px')};
  border-radius: ${({r}: RoundBoxBtnStyle) => (r ? r + 'px' : '15px')};
  justify-content: center;
  align-items: center;
  background-color: ${({bgColor, theme}: RoundBoxBtnStyle) => bgColor ?? theme?.color?.main};
  border-width: 1px;
  border-color: ${({borderColor, bgColor}: RoundBoxBtnStyle) => borderColor ?? bgColor};
  margin-right: ${({mr}: RoundBoxBtnStyle) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: RoundBoxBtnStyle) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: RoundBoxBtnStyle) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: RoundBoxBtnStyle) => (mb ? mb + 'px' : 0)};
`;

interface TextStyle extends StyledTheme {
  titleColor: string;
}

const BtnText = styled.Text`
  font-size: ${(props: TextStyle) => props.theme.ftSizes.l};
  color: ${(props: TextStyle) => props.titleColor};
  font-family: 'NotoSansKR-Bold';
  align-self: center;
`;

interface Props extends TouchableOpacityProps {
  title?: string;
  titleColor?: ColorValue;
  bgColor?: ColorValue;
  borderColor?: ColorValue;
  isLoading?: boolean;
  w?: number;
  h?: number;
  children?: ReactNode;
  r?: number;
  mb?: number;
  mt?: number;
  mr?: number;
  ml?: number;
}

const RoundBoxBtn = ({title, titleColor = color.gray, bgColor = color.main, isLoading = false, children, ...props}: Props) => {
  return (
    <StyledRoundBoxBtn bgColor={bgColor} {...props}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <NotoText fw="Bold" fs={ftSizes.s} ftColor={color.white}>
          {title}
        </NotoText>
      )}

      {children}
    </StyledRoundBoxBtn>
  );
};

export default RoundBoxBtn;
