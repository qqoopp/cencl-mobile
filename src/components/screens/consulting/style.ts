import styled from 'styled-components/native';
import {StyledTheme} from '@/../type';
import Row from '@/components/blocks/view/row';

export const ProfileImage = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: 8px;
  border-radius: 14px;
`;

export const HeaderRow = styled(Row)`
  background-color: transparent;
  position: absolute;
  top: ${({theme: {metrics}}: StyledTheme) => metrics.statusBarHeight};
  height: 50px;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth - 50};
  align-self: flex-end;
  padding-right: 10px;
  justify-content: space-between;
`;

export const MyChat = styled.View`
  padding: 9px 12px;
  border-radius: 14px;
  border-top-right-radius: 0px;
  background-color: ${({theme: {color}}: StyledTheme) => color.main};
  align-self: flex-end;
  flex-direction: row;
`;

export const OtherChat = styled(MyChat)`
  align-self: flex-start;
  border-top-right-radius: 14px;
  border-top-left-radius: 0px;
  background-color: ${({theme: {color}}: StyledTheme) => color.light_main};
`;

export const DateView = styled.View`
  align-items: center;
  padding: 24px 0;
`;
