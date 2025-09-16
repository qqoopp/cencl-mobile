import {StyledTheme} from '@/../type';
import {metrics} from '@/theme/theme';
import {calcResponsive} from '@/utils/responsiveSize';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultRow: {
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
    left: 20,
  },
  animation: {
    width: calcResponsive(250),
    height: calcResponsive(250),
    marginBottom: 50,
  },
});
interface EngBox extends StyledTheme {
  type: 'rft' | 'voca' | 'recording';
}

export const ResultBox = styled.View`
  padding: 15px;
  border-radius: 14px;
  width: ${({theme: {metrics}}: EngBox) => metrics.singleWidth + 'px'};
  align-self: center;
  background-color: ${({type, theme: {color}}: EngBox) => (type !== 'voca' ? '#FFFBE4' : color.light_main)};
  margin: 56px 0 ${metrics.screenHeight / 10 + 'px'} 0;
`;
