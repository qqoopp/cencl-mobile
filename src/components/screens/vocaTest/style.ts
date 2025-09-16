import {StyledTheme} from '@/../type';
import {StyledCol} from '@/components/blocks/view/col';
import {metrics} from '@/theme/theme';
import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  scrollViewBox: {
    height: 85,
    marginTop: 5,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  wordStudyScreen: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20 + metrics.notchBottom,
  },
  testScreen: {
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 20 + metrics.notchBottom,
  },
  resultScreen: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultOkayBtnView: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export const TestInfoCol = styled(StyledCol)`
  justify-content: center;
  align-items: center;
`;

export const TestInfoBox = styled.View`
  justify-content: center;
  align-items: center;
  padding: 10px 18px;
  border-radius: 12px;
  margin: 0 10px;
  background-color: ${({theme: {color}}: StyledTheme) => color.white};
`;

export const BodyView = styled(StyledCol)`
  padding: 20px 20px ${20 + metrics.notchBottom + 'px'} 20px;
  justify-content: space-between;
  flex: 1;
`;

interface WordPrevCardProps extends StyledTheme {
  isSelected: boolean;
}

export const WordPreviewCard = styled.View`
  padding: 19px 27px 13px;
  border-radius: 14px;
  shadow-offset: 5px 10px;
  height: 56px;
  margin: 10px 5px;

  background-color: ${({isSelected, theme: {color}}: WordPrevCardProps) => (isSelected ? color.main : color.white)};
`;

export const WordCard = styled.View`
  width: ${({theme: {metrics}}: StyledTheme) => metrics.tabletWidth + 'px'};
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background-color: white;
  padding: 0 20px;
`;

export const PlayButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  border-radius: 25px;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
`;

export const QuestionBox = styled.View`
  border-radius: 14px;
  border: 1px solid gray;
  padding: 16px;
  margin: 16px 0 24px 0;
`;

export const PlayButtonSm = styled.Pressable`
  flex-direction: row;
  align-items: center;
  align-self: center;
  padding: 8px 8px;
  border-radius: 25px;
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
`;

interface Distractor extends StyledTheme {
  isAnswer: boolean;
}

export const Distractor = styled.TouchableOpacity`
  padding: 16px;
  border-radius: 14px;
  margin-bottom: 20px;
  border-bottom-width: 3px;
  border-color: ${({theme: {color}, isAnswer}: Distractor) => (isAnswer ? '#651775' : color.dark_gray)};
  background-color: ${({theme: {color}, isAnswer}: Distractor) => (isAnswer ? color.main : color.gray)};
`;

export const TimerBox = styled.View`
  position: absolute;
  flex-direction: row;
  right: 20px;
  align-items: center;
  justify-content: center;
  top: ${({theme: {metrics}}: StyledTheme) => metrics.statusBarHeight + 20 + 'px'};
`;

// Result

export const ResultBox = styled.View`
  padding: 15px;
  border-radius: 14px;
  width: ${({theme: {metrics}}: EngBox) => metrics.tabletWidth + 'px'};
  align-self: center;
  background-color: ${({type, theme: {color}}: EngBox) => color.light_main};
  margin: 20px 0;
`;

interface EngBox extends StyledTheme {
  type?: 'question' | 'myAnswer' | 'corretAnswer';
}

export const EngBox = styled.View`
  width: ${({theme: {metrics}}: EngBox) => metrics.tabletWidth + 'px'};
  padding: 15px;
  border-radius: 14px;
  align-self: center;
  margin: 0 0 16px 0;
  background-color: ${({type, theme: {color}}: EngBox) => (type === 'question' ? color.gray : type === 'myAnswer' ? '#FF727D' : '#00C876')};
`;
