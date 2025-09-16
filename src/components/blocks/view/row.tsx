import {marginProps} from '@/../type';
import React, {ReactNode} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

interface Props extends marginProps {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
}

interface StyledRowProps extends Props {}

export const StyledRow = styled.View`
  margin-right: ${({mr}: StyledRowProps) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: StyledRowProps) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: StyledRowProps) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: StyledRowProps) => (mb ? mb + 'px' : 0)};
  flex-direction: row;
  align-items: center;
`;

const Row = ({children, style, ...props}: Props) => {
  return (
    <StyledRow {...props} style={style}>
      {children}
    </StyledRow>
  );
};

export default Row;
