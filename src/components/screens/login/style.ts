import {metrics} from '@/theme/theme';
import {StyleSheet, ViewStyle} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  screenBg: {
    paddingTop: 50 + metrics.statusBarHeight,
    alignItems: 'center',
  },
});

export const Logo = styled.Image`
  width: 150px;
  height: 150px;
`;

export const checkIcon: ViewStyle = {
  width: 24,
  height: 24,
};
