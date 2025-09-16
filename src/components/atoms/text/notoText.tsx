import {marginProps, StyledTheme} from '@/../type';
import {color} from '@/theme/theme';
import React, {ReactNode} from 'react';
import {Text, TextProps} from 'react-native';
import styled from 'styled-components/native';

interface Props extends TextProps, marginProps {
  children: ReactNode;
  fw?: 'Bold' | 'Light' | 'Medium' | 'Regular' | 'Thin';
  lh?: number;
  fs?: number;
  ftColor?: string;
}

interface StyledText extends StyledTheme, Props {}

export const StyledNotoText = styled.Text`
  color: ${({theme: {color}, ftColor}: StyledText) => ftColor ?? color.black};
  font-family: ${({fw}: StyledText) => fw ?? 'NotoSansKR-Regular'};
  line-height: ${({lh, fs}: StyledText) => fs && fs + 4 + 'px'};
  font-size: ${({fs}: StyledText) => fs + 'px'};
  /* vertical-align: center; */
  margin-right: ${({mr}: StyledText) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: StyledText) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: StyledText) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: StyledText) => (mb ? mb + 'px' : 0)};
`;

const _fw = {
  Bold: 'NotoSansKR-Bold',
  Light: 'NotoSansKR-Light',
  Medium: 'NotoSansKR-Medium',
  Regular: 'NotoSansKR-Regular',
  Thin: 'NotoSansKR-Thin',
};

const NotoText = ({
  children,
  ftColor = color.black,
  fw = 'Regular',
  fs = 14,
  lh = 18,
  ...props
}: Props) => {
  return (
    <StyledNotoText {...props} ftColor={ftColor} fw={_fw[fw]} lh={lh} fs={fs}>
      {children}
    </StyledNotoText>
  );
};

export default NotoText;
