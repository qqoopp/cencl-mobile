import {marginProps, StyledTheme} from '@/../type';
import {color} from '@/theme/theme';
import React, {ReactNode} from 'react';
import {TextInputProps} from 'react-native';
import styled from 'styled-components/native';

interface StyledInputTheme extends StyledTheme, marginProps, Props {
  type?: 'color' | 'white';
  w?: string | number;
}

const StyledTextInput = styled.TextInput`
  border-width: 1px;
  border-radius: 14px;
  color: ${({theme: {color}}: StyledInputTheme) => color.black};
  width: ${({theme: {metrics}, w}: StyledInputTheme) => (w ? (typeof w === 'number' ? w + 'px' : w) : metrics.singleWidth + 'px')};

  height: ${({type}: StyledInputTheme) => (type === 'color' ? '40px' : '50px')};
  background-color: ${({type, theme: {color}}: StyledInputTheme) => (type === 'color' ? color.light_main : color.white)};
  border-color: ${({theme: {color}, type}: StyledInputTheme) => (type === 'color' ? color.light_main : color.dark_gray)};
  margin-right: ${({mr}: StyledInputTheme) => (mr ? mr + 'px' : '0px')};
  margin-left: ${({ml}: StyledInputTheme) => (ml ? ml + 'px' : '0px')};
  margin-top: ${({mt}: StyledInputTheme) => (mt ? mt + 'px' : '0px')};
  margin-bottom: ${({mb}: StyledInputTheme) => (mb ? mb + 'px' : '0px')};
  padding-left: ${({pl}: StyledInputTheme) => (pl ? pl + 'px' : '15px')};
`;

interface Props extends TextInputProps, marginProps {
  children?: ReactNode;
  type?: 'color' | 'white';
  pl?: number;
  w?: number | string;
}

const UserInput = (props: Props) => {
  return (
    <StyledTextInput autoCapitalize="none" placeholderTextColor={color.dark_gray} {...props}>
      {props.children}
    </StyledTextInput>
  );
};

export default UserInput;
