import {StyledTheme} from '@/../type';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {metrics} from '@/theme/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  screenBg: {
    height: metrics.screenHeight,
    overflow: 'visible',
  },
});

interface CategoryBtn extends StyledTheme {
  isSelected: boolean;
}

export const CategoryBtn = styled.TouchableOpacity`
  padding: 8px;
  margin: 0 10px 0 0;
  border-bottom-width: 3px;
  border-color: ${({theme: {color}, isSelected}: CategoryBtn) => (isSelected ? color.main : 'transparent')};
`;

interface StyledDay extends StyledTheme {
  isSelectedDay: boolean;
}

export const Day = styled.TouchableOpacity`
  align-items: center;
  background-color: ${({isSelectedDay, theme}: StyledDay) => (isSelectedDay ? theme.color.black : theme.color.white)};
  border-radius: 5px;
  margin: 0 2px;
  padding: 7px;
`;

export const Dot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: ${({isSelectedDay, theme}: StyledDay) => (isSelectedDay ? theme.color.white : theme.color.black)};
  margin: 7px 0 0 0;
`;

export const EmptyDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 10px;
  background-color: transparent;
  margin: 7px 0 0 0;
`;
