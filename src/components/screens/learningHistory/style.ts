import {StyledTheme} from '@/../type';
import {calcResponsive, widthPercentage} from '@/utils/responsiveSize';
import React from 'react';
import styled from 'styled-components/native';
import {StyledNotoText} from '@/components/atoms/text/notoText';
export const LearningCategoryBox = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
`;

export const DateBtn = styled.TouchableOpacity`
  border-radius: 10px;
  height: 40px;
  width: 100px;
  border: 1px solid #f2f2f2;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
`;

export const CheckBtn = styled.TouchableOpacity`
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const CategoryBox = styled.View`
  flex-direction: row;
  padding: 0 10px;
`;

interface CategoryBtnProps extends StyledTheme {
  isNow: boolean;
}

export const CategoryBtn = styled.TouchableOpacity`
  padding: 10px 0px;
  border-bottom-width: 3px;
  margin: 0 15px;
  border-color: ${({theme: {color}, isNow}: CategoryBtnProps) => (isNow ? color.main : 'transparent')};
`;

export const HistoryBox = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  padding: 20px;
  flex-direction: row;
  align-items: center;
`;

export const Thumbnail = styled.Image`
  border-radius: 10px;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  width: ${widthPercentage(90) + 'px'};
  height: ${(widthPercentage(90) / 3) * 4 + 'px'};
  margin: 0 16px 0 0;
`;

export const TextInfoBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${calcResponsive(14) + 'px'};
  width: ${widthPercentage(50) + 'px'};
  font-family: 'NotoSansKR-Bold';
  color: #000;
`;

export const ValueTxt = styled.Text`
  font-family: 'NotoSansKR-Regular';
  width: ${widthPercentage(60) + 'px'};
  color: #000;
`;

interface VocaStatusCardProps extends StyledTheme {
  isDone: boolean;
}

export const VocaStatusCard = styled.View`
  padding: 4px 10px;
  border-radius: 8px;
  background-color: ${({theme: {color}, isDone}: VocaStatusCardProps) => (isDone ? color.warn : color.main)};
`;

export const SampleListeningButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px;
  width: 140px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 5px 10px 0 0;
  background-color: ${({theme: {color}}: StyledTheme) => color.main};
`;
