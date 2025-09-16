import {StyledTheme} from '@/../type';
import styled from 'styled-components/native';

export const GrowthCard = styled.View`
  padding: 0px 20px;
`;

export const HistoryTypeView = styled.View`
  padding: 4px 10px;
  border-radius: 10px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  border-color: ${({theme: {color}}: StyledTheme) => color.dark_gray};
`;

export const GrowthRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
`;

export const CommentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const BlindView = styled.View`
  position: absolute;
  right: 0px;
  border: 0px;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.screenWidth + 'px'};
  height: 100%;
  background-color: #00000040;
  z-index: 10;
  justify-content: center;
  align-items: center;
`;
