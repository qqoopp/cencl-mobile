import {calcResponsive, widthPercentage} from '@/utils/responsiveSize';
import styled from 'styled-components/native';

export const TableBox = styled.View`
  align-items: center;
  justify-content: center;
  padding: 13px 0px;
  flex: 1;
  flex-direction: row;
`;

export const InfoBtn = styled.TouchableOpacity`
  margin: 0 0 0 5px;
`;

export const GEInfoBox = styled.View`
  position: absolute;
  flex-direction: row;
  top: 30px;
  width: ${widthPercentage(240) + 'px'};
  padding: 20px;
  border-radius: 8px;
  z-index: 10000;
  background-color: #000000;
  justify-content: space-between;
`;
