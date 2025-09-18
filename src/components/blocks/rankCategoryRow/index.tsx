import {StyledTheme} from '@/../type';
import NotoText from '@/components/atoms/text/notoText';
import {color} from '@/theme/theme';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
import {View} from 'react-native';
const CategoryBox = styled.View`
  flex-direction: row;
  padding: 0 10px;
  z-index: -1;
`;

interface CategoryBtnProps extends StyledTheme {
  isNow: boolean;
}

export const CategoryBtn = styled.TouchableOpacity`
  padding: 10px 0px;
  border-bottom-width: 3px;
  margin: 0 15px;
  border-color: ${({theme: {color}, isNow}: CategoryBtnProps) => (isNow ? color.main : 'transparent')};
`;

export type rankCategory = '단어' | '독서량' | 'RFT';

interface Props {
  onChangeCategory: (category: rankCategory) => void;
  initialType?: '단어' | '독서량' | 'RFT';
}

const RankCategoryRow = ({onChangeCategory, initialType}: Props) => {
  const rankCategory: rankCategory[] = ['단어', '독서량', 'RFT'];

  const [nowCategory, setNowCategory] = useState<rankCategory>(initialType ?? '단어');

  const onPressCategory = (category: rankCategory) => {
    setNowCategory(category);
    onChangeCategory(category);
  };

  return (
    <CategoryBox>
      <View style={{width: '100%', display: 'flex', flexDirection: 'row'}}>
        {rankCategory.map(category => {
          return (
            <CategoryBtn key={category} style={{flex: 0.33}} isNow={nowCategory === category} onPress={() => onPressCategory(category)}>
              <NotoText ftColor={nowCategory === category ? color.main : color.black} fw="Bold" style={{textAlign: 'center'}}>
                {category}
              </NotoText>
            </CategoryBtn>
          );
        })}
      </View>
    </CategoryBox>
  );
};

export default RankCategoryRow;
