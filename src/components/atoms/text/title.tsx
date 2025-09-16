import {marginProps} from '@/../type';
import {ftSizes} from '@/theme/theme';
import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {StyledNotoText} from './notoText';

interface Props extends marginProps {
  children: ReactNode;
}

const StyledTitle = styled(StyledNotoText)`
  font-family: 'NotoSansKR-Bold';
`;

const Title = ({children, ...props}: Props) => {
  return (
    <StyledTitle fw="Bold" fs={ftSizes.xl} {...props}>
      {children}
    </StyledTitle>
  );
};

export default Title;
