import {StyledTheme} from '@/../type';
import {metrics} from '@/theme/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  bgScreen: {
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
});

export const Title = styled.Image`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.singleWidth - 20 + 'px'};
  height: ${({theme: {metrics}}: StyledTheme) => metrics.singleWidth * 0.311 + 'px'};
  align-self: center;
  margin-top: 15%;
`;

export const KidImage = styled.Image`
  width: 100%;
  height: 70%;
`;

export const CertificationMarkView = styled.View`
  position: absolute;
  bottom: 0px;
  align-items: flex-end;
`;

export const CertifiactionMarkImage = styled.Image`
  width: 80px;
  height: 80px;
  margin: 0 20px 0 0;
`;
