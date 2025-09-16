import {StyledTheme} from '@/../type';
import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import NotoText from '../text/notoText';
import VIcon from '../vIcon';
import {View} from 'react-native';
import {color} from '@/theme/theme';

interface CardStyledTheme extends StyledTheme, Props {}

const Card = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  flex-direction: row;
  align-items: center;
  /* border: 1px solid ${({theme: {color}}: StyledTheme) => color.dark_gray}; */
  margin: 8px 0px;
  height: 80px;
  padding: 12px;
  border-radius: 12px;
  background-color: ${({theme: {color}, type}: CardStyledTheme) => (type === 'class' ? '#DBF0FF' : type === 'test' ? '#FFDCDF' : '#FFFBE6')};
`;

const IconBox = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({theme: {color}}: StyledTheme) => color.white};
  border: 1px solid ${({theme: {color}}: StyledTheme) => color.dark_gray};
  justify-content: center;
  align-items: center;
`;

interface Props {
  type: 'class' | 'test' | 'homework';
  title: string;
  isTouchable?: boolean;
}

const ClassCard = ({type, title, isTouchable}: Props) => {
  return (
    <Card type={type}>
      <IconBox>
        {type === 'class' && <VIcon type="MaterialIcons" name="book" color="#6EC3FF" size={27} />}
        {type === 'test' && <VIcon type="FontAwesome" name="file-text" color="#FF727D" size={25} />}
        {type === 'homework' && <VIcon type="MaterialCommunityIcons" name="file-document" color="#FFDD00" size={25} />}
      </IconBox>
      <NotoText ml={20}>{title}</NotoText>
      {isTouchable && (
        <View
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            right: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: 25,
            borderColor: color.gray,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <VIcon type="Feather" name="arrow-right" size={20} color={type === 'test' ? '#FF727D' : '#FFDD00'} />
        </View>
      )}
    </Card>
  );
};

export default ClassCard;
