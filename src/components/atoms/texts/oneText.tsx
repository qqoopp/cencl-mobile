import {marginProps, StyledTheme} from '@/../type';
import React, {ReactNode} from 'react';
import {TextProps} from 'react-native';
import styled from 'styled-components/native';
import {AutoSizeText, ResizeTextMode} from 'react-native-auto-size-text';

interface Props extends TextProps, marginProps {
  children: ReactNode;
  fm?: 'bold' | 'light' | 'pop' | 'regular' | 'title';
  lh?: number;
  fs?: number;
  ftColor?: string;
  numberOfLines?: number;
}

interface StyledText extends StyledTheme, Props {
  fw: string;
}

export const StyledOneText = styled(AutoSizeText)`
  color: ${({theme: {color}, ftColor}: StyledText) => ftColor ?? '#000'};
  font-family: ${({fw}: StyledText) => fw ?? 'ONE Mobile POP'};
  font-size: ${({fs}: StyledText) => fs + 'px'};
  line-height: ${({lh}: StyledText) => lh + 'px'};
  margin-right: ${({mr}: StyledText) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: StyledText) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: StyledText) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: StyledText) => (mb ? mb + 'px' : 0)};
`;

const _fm = {
  bold: 'ONE Mobile Bold',
  light: 'ONE Mobile Light',
  pop: 'ONE Mobile POP',
  regular: 'ONE Mobile Regular',
  title: 'ONE Mobile Title',
};

const OneText = ({children, numberOfLines = 1, ftColor = '#000', fm = 'pop', fs = 14, lh, ...props}: Props) => {
  return (
    <StyledOneText
      ftColor={ftColor}
      fw={_fm[fm] ?? _fm.pop}
      lh={lh ?? fs + 2}
      fs={fs}
      fontSize={fs}
      numberOfLines={numberOfLines}
      mode={ResizeTextMode.max_lines}
      {...props}>
      {children}
    </StyledOneText>
  );
};

export default OneText;
