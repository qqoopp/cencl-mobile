import {StyledTheme} from '@/../type';
import {widthPercentage} from '@/utils/responsiveSize';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';

export const RftBox = styled.View`
  flex-direction: row;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};

  padding: 20px;
`;

export const RftThumbnail = styled.Image`
  /* width: 90px;
  height: 120px; */
  width: ${widthPercentage(90) + 'px'};
  height: ${(widthPercentage(90) / 3) * 4 + 'px'};
  border-radius: 10px;
  /* margin: 20px 16px 20px 0; */
  background-color: gray;
`;

interface StudyButtonProps extends StyledTheme {
  type: 'listening' | 'reading';
}

export const StudyButton = styled.TouchableOpacity`
  flex-direction: row;
  padding: 8px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 10px 0 0;
  background-color: ${({type, theme: {color}}: StudyButtonProps) => (type === 'listening' ? color.gray : color.main)};
`;

export const TextInfoBox = styled.View`
  margin: 0 0 0 20px;
  align-self: center;
  flex: 1;
`;

export const TrashButton = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: -4px;
  padding: 7px;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  border-radius: 5px;
  z-index: 10;
`;
