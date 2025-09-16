import {StyledTheme} from '@/../type';
import {metrics} from '@/theme/theme';
import {heightPercentage, widthPercentage} from '@/utils/responsiveSize';
import {StyleSheet, TouchableOpacityProps} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    paddingBottom: 230 + metrics.notchBottom,
  },
});

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 15px;
`;

export const ReadingBox = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  padding: 20px 0 0 0;
  position: absolute;
  bottom: 0px;
  right: 0px;
  background-color: white;
  min-height: 230px;
  align-items: center;
`;

export const Prompter = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

interface playBtn extends StyledTheme {
  isTtsing: boolean;
}

export const PlayBtn = styled.TouchableOpacity`
  width: 130px;
  height: 48px;
  background-color: ${({theme: {color}, isTtsing}: playBtn) => (isTtsing ? color.dark_gray : color.main)};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 25px;
`;

export const TutorialContainer = styled.Pressable`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  height: ${({theme: {metrics}}: StyledTheme) => metrics.screenHeight + metrics.statusBarHeight + 'px'};
  padding-vetical: ${({theme: {metrics}}: StyledTheme) => metrics.statusBarHeight + 'px'};
  background-color: #4c4c4c;
  position: absolute;
  right: 0px;
  bottom: 0px;
  z-index: 100000;
  align-items: center;
  justify-content: center;
`;

export const TutorialImage = styled.Image`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  height: ${({theme: {metrics}}: StyledTheme) => metrics.screenHeight - metrics.statusBarHeight + 'px'};
`;

interface WidthButton extends StyledTheme, TouchableOpacityProps {}

export const WidthButton = styled.TouchableOpacity`
  width: ${({theme: {metrics}}: WidthButton) => metrics.screenWidth + 'px'};
  height: 50px;
  justify-content: center;
  align-items: center;
  margin: 16px 0 0 0;
  background-color: ${({theme: {color}, disabled}: WidthButton) => (disabled ? color.dark_gray : color.main)};
`;

export const Thumbnail = styled.Image`
  border-radius: 18px;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  align-self: center;
  margin: 10%;
  width: ${widthPercentage(240) + 'px'};
  height: ${heightPercentage(340) + 'px'};
`;
