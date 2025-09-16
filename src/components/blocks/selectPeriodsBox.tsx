import {StyledTheme} from '@/../type';
import {ftSizes} from '@/theme/theme';
import {getFullDateByCalcDaysAgo} from '@/utils/getFullDateByCalcDaysAgo';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
import NotoText from '../atoms/text/notoText';
import {widthPercentage} from '@/utils/responsiveSize';

interface Props {
  onPressChkBtn: () => void;
  onChangePeriod: (periods: Date[]) => void;
}

const SelectPeriodsBox = ({onPressChkBtn, onChangePeriod}: Props) => {
  const [period, setPeriod] = useState([new Date(getFullDateByCalcDaysAgo(90)), new Date(getFullDateByCalcDaysAgo(-10))]);
  const [isDateMdOpen, setIsDateMdOpen] = useState([false, false]);

  useEffect(() => {
    onChangePeriod(period);
  }, [period]);

  const onPressPeriodBtn = (isStart: boolean) => {
    const _isDateMdOpen = isStart ? [true, false] : [false, true];
    setIsDateMdOpen(_isDateMdOpen);
  };
  const onChagneDate = (date: Date, isStart: boolean) => {
    closeDatePickerModal();
    const _period = [...period];
    if (isStart) {
      _period[0] = date;
    } else {
      _period[1] = date;
    }
    _period.sort((a, b) => a - b);
    setPeriod(_period);
  };

  const closeDatePickerModal = () => setIsDateMdOpen([false, false]);

  return (
    <>
      <LearningCategoryBox>
        <NotoText fw="Bold" fs={ftSizes.s}>
          기간
        </NotoText>
        <DateBtn onPress={() => onPressPeriodBtn(true)}>
          <NotoText>{period[0].toISOString().split('T')[0]}</NotoText>
        </DateBtn>
        <NotoText fw="Bold" fs={ftSizes.s}>
          {'  ~  '}
        </NotoText>
        <DateBtn onPress={() => onPressPeriodBtn(false)}>
          <NotoText>{period[1].toISOString().split('T')[0]}</NotoText>
        </DateBtn>
        <CheckBtn>
          <NotoText fw="Bold" onPress={onPressChkBtn}>
            조회
          </NotoText>
        </CheckBtn>
      </LearningCategoryBox>
      <DatePicker
        modal
        locale="ko-KR"
        mode="date"
        onConfirm={date => onChagneDate(date, true)}
        onCancel={closeDatePickerModal}
        open={isDateMdOpen[0]}
        date={period[0]}
      />
      <DatePicker
        modal
        locale="ko-KR"
        mode="date"
        open={isDateMdOpen[1]}
        date={period[1]}
        onConfirm={date => {
          onChagneDate(date, false);
        }}
        onCancel={closeDatePickerModal}
      />
    </>
  );
};

export default SelectPeriodsBox;

export const LearningCategoryBox = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
`;

export const DateBtn = styled.TouchableOpacity`
  border-radius: 10px;
  height: 40px;
  width: ${widthPercentage(100) + 'px'};
  border: 1px solid #f2f2f2;
  justify-content: center;
  align-items: flex-start;
  padding: 0 10px;
`;

export const CheckBtn = styled.TouchableOpacity`
  background-color: ${({theme: {color}}: StyledTheme) => color.gray};
  height: 40px;
  padding: 0 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const CategoryBox = styled.View`
  flex-direction: row;
  padding: 0 10px;
`;
