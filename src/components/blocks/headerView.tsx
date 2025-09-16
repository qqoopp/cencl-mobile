import {StyledTheme} from '@/../type';
import {metrics} from '@/theme/theme';
import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {goBack} from '@/utils/rootNavigations';

interface HeaderViewparams extends StyledTheme, Props {}

export const StyledHeaderView = styled.View`
  padding: ${30 + metrics.statusBarHeight + 'px'} 0 12px 0;
  justify-content: center;
  align-items: center;
  background-color: ${({theme: {color}, children, bgColor}: HeaderViewparams) => bgColor ?? color.main};
  /* border-end-end-radius: 24px; */
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

export const ArrowBtn = styled.TouchableOpacity`
  position: absolute;
  left: 13px;
  top: ${12 + metrics.statusBarHeight + 'px'};
`;

interface Props {
  children: ReactNode;
  bgColor?: string;
}

const HeaderView = ({children, bgColor}: Props) => {
  return (
    <StyledHeaderView bgColor={bgColor}>
      <ArrowBtn onPress={goBack}>
        <MIcon name="arrow-back-ios" size={24} />
      </ArrowBtn>
      {children}
    </StyledHeaderView>
  );
};

export default HeaderView;
