import {StyledTheme} from '@/../type';
import Row, {StyledRow} from '@/components/blocks/view/row';
import {metrics} from '@/theme/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrolConentContainer: {
    alignItems: 'center',
    paddingBottom: metrics.notchBottom + 80,
  },
  titleBox: {
    width: metrics.tabletWidth,
  },
});

export const IconBox = styled.View`
  background-color: ${({theme: {color}}: StyledTheme) => color.main};
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 0 20px 0 0;
`;

export const LeftClassBoard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  padding: 16px;
  border-radius: 14px;
  margin: 0 0 24px 0;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
`;

export const InfoRowBtn = styled.TouchableOpacity`
  flex-direction: row;
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  border-bottom: 1px solid ${({theme: {color}}: StyledTheme) => color.warn};
  padding: 18px 0px;
  justify-content: space-between;
  align-items: center;
`;

export const ConsultingButton = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;
