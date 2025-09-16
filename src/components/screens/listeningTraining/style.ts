import {StyledTheme} from '@/../type';
import {StyledNotoText} from '@/components/atoms/text/notoText';
import {StyledRow} from '@/components/blocks/view/row';
import {metrics} from '@/theme/theme';
import {calcResponsive, heightPercentage, widthPercentage} from '@/utils/responsiveSize';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  screen: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20 + metrics.notchBottom,
  },
  playBtn: {
    marginHorizontal: 32,
  },
});

export const Thumbnail = styled.Image`
  border-radius: 18px;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  width: ${widthPercentage(240) + 'px'};
  height: ${heightPercentage(340) + 'px'};
`;

export const PlayTimeRow = styled(StyledRow)`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.singleWidth + 'px'};
  justify-content: space-between;
`;

export const PlayNavBox = styled(StyledRow)`
  align-self: center;
`;
