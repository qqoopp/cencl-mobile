import {StyledTheme} from '@/../type';
import styled from 'styled-components/native';

export const CommentsBox = styled.View`
  width: 100%;
  height: ${({theme: {metrics}}: StyledTheme) => metrics.screenHeight * 0.8 + 'px'};
  background-color: ${({theme: {color}}: StyledTheme) => color.white};
`;

export const Header = styled.View`
  height: 45px;
  align-items: center;
  flex-direction: row;
  padding: 0 15px;
`;
