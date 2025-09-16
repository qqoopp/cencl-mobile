import {StyledTheme} from '@/../type';
import NotoText, {StyledNotoText} from '@/components/atoms/text/notoText';
import {StyledRow} from '@/components/blocks/view/row';
import {metrics} from '@/theme/theme';
import {StyleSheet} from 'react-native';
import {isTablet} from 'react-native-device-info';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  contenetContainer: {
    paddingBottom: metrics.notchBottom + 80,
  },
});

interface NoticeRowStyled extends StyledTheme {
  isAnnouncement?: boolean;
}

export const NoticeRowBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: ${({isAnnouncement}: NoticeRowStyled) => (isAnnouncement ? 'space-between' : 'flex-start')};
  padding: 16px;
`;

export const NavRow = styled(StyledRow)`
  padding: 0px 20px;
`;

interface NavBtnProps extends StyledTheme {
  isOn: Boolean;
}

export const NavBtn = styled.TouchableOpacity`
  padding: 8px 2px;
  border-bottom-width: 3px;
  margin: 0 25px 0 0;
  border-color: ${({isOn, theme: {color}}: NavBtnProps) => (isOn ? color.main : 'transparent')};
  /* border-bottom: 3px solid ${({isOn, theme: {color}}: NavBtnProps) => (isOn ? color.main : 'transparent')}; */
`;

export const NavText = styled(NotoText)`
  color: ${({theme: {color}, isOn}: NavBtnProps) => (isOn ? color.main : color.black)};
`;

export const AnnounceTitle = styled.Text`
  font-size: ${({theme: {ftSizes}}: StyledTheme) => ftSizes.m + 'px'};
  margin: 0 0 6px 0;
  color: black;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth * 0.7 + 'px'};
`;

export const AnnounceIconBox = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 0 16px 0 0;
  background-color: #ff727d;
  align-items: center;
  justify-content: center;
`;

export const AlarmIcon = styled.Image`
  width: 40px;
  height: 40px;
  margin: 0 16px 0 0;
`;
