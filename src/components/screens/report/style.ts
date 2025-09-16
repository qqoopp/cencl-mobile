import {StyledTheme} from '@/../type';
import styled from 'styled-components/native';

export const ValueRow = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  align-self: center;
  padding: 15px 0px;
  justify-content: space-between;
  flex-direction: row;
`;
