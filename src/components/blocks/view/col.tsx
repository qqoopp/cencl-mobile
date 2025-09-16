import {marginProps} from '@/../type';
import React, {ReactNode} from 'react';
import {ViewProps} from 'react-native';
import styled from 'styled-components/native';

interface StyledRowProps extends marginProps {}

export const StyledCol = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: ${({mr}: StyledRowProps) => (mr ? mr + 'px' : 0)};
  margin-left: ${({ml}: StyledRowProps) => (ml ? ml + 'px' : 0)};
  margin-top: ${({mt}: StyledRowProps) => (mt ? mt + 'px' : 0)};
  margin-bottom: ${({mb}: StyledRowProps) => (mb ? mb + 'px' : 0)};
`;

interface Props extends ViewProps, marginProps {
  children: ReactNode;
}

const Col = ({children, ...props}: Props) => {
  return <StyledCol {...props}>{children}</StyledCol>;
};

export default Col;
