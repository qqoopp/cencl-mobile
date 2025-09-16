import React, {ReactDOM, ReactElement, ReactNode} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';

const StyledHeaderBox = styled.View`
  height: 50px;
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const First = styled.View`
  position: absolute;
  left: 20px;
`;
const Last = styled.View`
  position: absolute;
  right: 20px;
`;

interface Props {
  first?: ReactNode;
  second?: ReactNode;
  third?: ReactNode;
}

const Empty = styled.View`
  /* width: 30px; */
`;

const HeaderBox = ({first = <View />, second = <View />, third = <View />}: Props) => {
  return (
    <StyledHeaderBox>
      <First>{first}</First>
      <View style={{alignSelf: 'center'}}>{second}</View>
      <Last>{third}</Last>
    </StyledHeaderBox>
  );
};

export default HeaderBox;
