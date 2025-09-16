import React, {ReactNode, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {StyledTheme, marginProps} from '../../../../type';
import {ActivityIndicator, LayoutChangeEvent, ViewStyle} from 'react-native';

interface ItemCardProps extends StyledTheme {
  w: number | string;
  h: number | string;
  isCenter?: boolean;
  bgColor?: string;
  r?: number;
}

const StyledItemCard = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  width: ${({w}: ItemCardProps) => (typeof w === 'string' ? w : `${w}px`)};
  height: ${({h}: ItemCardProps) => (typeof h === 'string' ? h : `${h}px`)};
  background-color: ${({bgColor}: ItemCardProps) => bgColor ?? '#fff'};
  border-radius: ${({r}: ItemCardProps) => (r ? `${r}px` : '16px')};
  justify-content: space-between;
  align-items: center;
  ${props =>
    props.isCenter &&
    css`
      align-items: center;
      justify-content: center;
    `}
`;

interface innerShadowProps extends StyledTheme {
  w: number | string;
  h: number | string;
  innerShadowColor: string;
  r?: number;
  shadowLineWidth?: number;
}

const InnerShadow = styled.View`
  width: ${({w}: innerShadowProps) => (typeof w === 'string' ? w : `${w}px`)};
  height: ${({h}: innerShadowProps) => (typeof h === 'string' ? h : `${h}px`)};
  background-color: ${({innerShadowColor}: innerShadowProps) => innerShadowColor};
  border-radius: ${({r}: innerShadowProps) => (r ? `${r}px` : '16px')};
`;

interface shadowColor extends StyledTheme {
  w: number | string;
  h: number | string;
  shadowColor: string;
  r?: number;
  isOnlyInnerShadow?: boolean;
  shadowLineWidth?: number;
}

const Shadow = styled.View`
  top: 0;
  left: 0;
  width: ${({w}: shadowColor) => (typeof w === 'string' ? w : `${w}px`)};
  height: ${({h}: shadowColor) => (typeof h === 'string' ? h : `${h}px`)};
  background-color: ${({shadowColor, isOnlyInnerShadow}: shadowColor) => (isOnlyInnerShadow ? 'transparent' : shadowColor)};
  margin-right: ${({mr}: shadowColor) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: shadowColor) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: shadowColor) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: shadowColor) => (mb ? mb + 'px' : 0)};
  border-radius: ${({r}: shadowColor) => (r ? `${r}px` : '16px')};
  transform: ${({isOnlyInnerShadow}: shadowColor) => `translateY(${isOnlyInnerShadow ? 3 : 0}px)`};
  overflow: hidden;
  z-index: -1;
`;

interface props extends marginProps {
  w: number | string;
  h: number | string;
  r?: number;
  style?: ViewStyle;
  isCenter?: boolean;
  children: ReactNode;
  disabled?: boolean;
  isOnlyInnerShadow?: boolean;
  bgColor?: string;
  innerShadowColor?: string;
  shadowColor?: string;
  colors?: string[];
  shadowLineWidth?: number;
}

const ShadowCard = ({
  w,
  h,
  r,
  isCenter,
  isOnlyInnerShadow,
  disabled = false,

  children,
  style,
  colors = ['#fff', '#eef3fd', '#e1e1e9'],
  shadowLineWidth,
  ...props
}: props) => {
  const [cardHeight, setChadHeight] = useState(typeof h === 'string' ? 0 : h);

  const onLayout = (e: LayoutChangeEvent) => {
    setChadHeight(e.nativeEvent.layout.height);
  };

  return (
    <Shadow
      w={w}
      h={h}
      r={r}
      shadowLineWidth={shadowLineWidth}
      isOnlyInnerShadow={isOnlyInnerShadow}
      shadowColor={colors[2] ?? '#e1e1e9'}
      onLayout={onLayout}
      {...props}>
      {cardHeight === 0 ? (
        <ActivityIndicator />
      ) : (
        <InnerShadow
          w={w}
          r={r}
          h={cardHeight - (shadowLineWidth ?? 3)}
          shadowLineWidth={shadowLineWidth}
          innerShadowColor={disabled ? '#838383' : colors[1]}>
          <StyledItemCard
            isCenter={isCenter}
            style={style}
            r={r}
            bgColor={disabled ? '#999999' : colors[0]}
            w={w}
            h={cardHeight - (shadowLineWidth ? shadowLineWidth * 2 : 6)}>
            {children}
          </StyledItemCard>
        </InnerShadow>
      )}
    </Shadow>
  );
};

export default ShadowCard;
