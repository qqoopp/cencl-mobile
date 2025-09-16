import {StyledTheme} from '@/../type';
import styled from 'styled-components/native';

export const InfoCol = styled.View`
  flex-direction: column;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  align-self: center;
`;

export const Title = styled.Text`
  width: 120px;
  margin: 18px 0px;
  color: #000;
`;
