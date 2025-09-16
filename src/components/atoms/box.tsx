import {StyledTheme, marginProps, paddingProps} from '@/types/common';
import React, {ReactNode} from 'react';
import {FlexAlignType, ViewStyle} from 'react-native';
import {ViewProps} from 'react-native';
import styled, {css} from 'styled-components/native';

interface styledBoxProps extends StyledTheme, props {}

const StyledBox = styled.View`
  width: ${({w, theme: {metrics}}: styledBoxProps) => (w ? (typeof w === 'number' ? `${w}px` : w) : 'auto')};
  height: ${({h, theme: {metrics}}: styledBoxProps) => (h ? (typeof h === 'number' ? `${h}px` : h) : 'auto')};
  margin: ${({mr, ml, mt, mb, m}: styledBoxProps) => `${mt ?? m ?? 0}px ${mr ?? m ?? 0}px ${mb ?? m ?? 0}px ${ml ?? m ?? 0}px`};
  padding: ${({pt, pr, pb, pl, p}: styledBoxProps) => `${pt ?? p ?? 0}px ${pr ?? p ?? 0}px ${pb ?? p ?? 0}px ${pl ?? p ?? 0}px`};
  ${(props: styledBoxProps) =>
    props.row &&
    css`
      flex-direction: row;
      align-items: center;
      ${props.spaceBetween &&
      css`
        justify-content: space-between;
      `}
    `};

  ${(props: styledBoxProps) =>
    props.spaceBetween &&
    css`
      justify-content: space-between;
    `}
  ${(props: styledBoxProps) =>
    props.justifyStart &&
    css`
      justify-content: flex-start;
    `};
  ${(props: styledBoxProps) =>
    props.col &&
    css`
      flex-direction: column;
      justify-content: center;
    `};
  ${(props: styledBoxProps) =>
    props.center &&
    css`
      align-items: center;
      justify-content: center;
    `};
  ${(props: styledBoxProps) =>
    props.selfCenter &&
    css`
      align-self: center;
    `};
  ${(props: styledBoxProps) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `};
  ${(props: styledBoxProps) =>
    props.alignStart &&
    css`
      align-items: flex-start;
    `};
  ${(props: styledBoxProps) =>
    props.alignSelf &&
    css`
      align-items: ${props.alignSelf};
    `};
`;

interface props extends marginProps, paddingProps, ViewProps {
  children?: ReactNode;
  w?: number | string;
  h?: number | string;
  row?: boolean;
  col?: boolean;
  center?: boolean;
  selfCenter?: boolean;
  spaceBetween?: boolean;
  justifyStart?: boolean;
  alignStart?: boolean;
  flex?: number;
  style?: ViewStyle;
  alignSelf?: 'auto' | FlexAlignType;
}

const Box = ({children, ...props}: props) => {
  return <StyledBox {...props}>{children}</StyledBox>;
};

export default Box;
