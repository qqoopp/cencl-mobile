import {StyledTheme} from '@/../type';
import NotoText from '@/components/atoms/text/notoText';
import {color} from '@/theme/theme';
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ScrollView} from 'react-native-gesture-handler';
const CategoryBox = styled.View`
  flex-direction: row;
  padding: 0 10px;
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

export type learningCategory = 'Reading' | 'Speaking' | 'Writing' | '읽기유창성연습' | 'Voca' | 'Comment';
export type reportCategory = 'Reading' | 'Speaking' | 'Writing' | 'Voca' | 'Comment';

interface Props {
  onChangeCategory: (category: learningCategory) => void;
  type: 'report' | 'learningHistory';
  initialType?: 'Reading' | 'Speaking' | 'Writing';
}

const LearningCategoryRow = ({onChangeCategory, type, initialType}: Props) => {
  const learningCategory: learningCategory[] =
    type === 'report' ? ['Reading', 'Speaking', 'Writing', 'Voca', 'Comment'] : ['Reading', 'Speaking', 'Writing', '읽기유창성연습', 'Voca'];

  const [nowCategory, setNowCategory] = useState<learningCategory>(initialType ?? 'Reading');

  const onPressCategory = (category: learningCategory) => {
    setNowCategory(category);
    onChangeCategory(category);
  };

  return (
    <CategoryBox>
      <ScrollView nestedScrollEnabled scrollsToTop={false} horizontal showsHorizontalScrollIndicator={false}>
        {learningCategory.map(category => {
          return (
            <CategoryBtn key={category} isNow={nowCategory === category} onPress={() => onPressCategory(category)}>
              <NotoText ftColor={nowCategory === category ? color.main : color.black} fw="Bold">
                {category}
              </NotoText>
            </CategoryBtn>
          );
        })}
      </ScrollView>
    </CategoryBox>
  );
};

export default LearningCategoryRow;
