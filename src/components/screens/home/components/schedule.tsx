import {StyledTheme} from '@/../type';
import NotoText from '@/components/atoms/text/notoText';
import VIcon from '@/components/atoms/vIcon';
import Row from '@/components/blocks/view/row';
import memberState from '@/states/memberState';
import {ftSizes, metrics} from '@/theme/theme';
import {calcResponsive} from '@/utils/responsiveSize';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useAtom} from 'jotai';
import styled from 'styled-components/native';

const DayView = styled.View`
  width: ${calcResponsive(50) + 'px'};
  height: ${calcResponsive(120) + 'px'};
  justify-content: center;
  align-items: center;
  border-width: 0.3px;
  border-color: ${({theme: {color}}: StyledTheme) => color.dark_gray};
`;

const ClassView = styled.View`
  width: ${(metrics.screenWidth - calcResponsive(50)) / 4 + 'px'};
  height: ${calcResponsive(120) + 'px'};
  border-width: 0.3px;
  padding: ${calcResponsive(6) + 'px'};
  border-color: ${({theme: {color}}: StyledTheme) => color.dark_gray};
`;

const ClassBox = styled.View`
  height: 100%;
  width: 100%;
  border-radius: 5px;
  background-color: #dbf0ff;
  border-width: 1px;
  border-color: #6ec3ff;
  justify-content: center;
  align-items: center;
`;

function getSchedule(member: loginData) {
  const {
    attend_1,
    attend_2,
    attend_3,
    attend_4,
    attend_5,
    attend_6,
    attend_s_1,
    attend_s_2,
    attend_s_3,
    attend_s_4,
    attend_s_5,
    attend_s_6,
    attend_v_1,
    attend_v_2,
    attend_v_3,
    attend_v_4,
    attend_v_5,
    attend_v_6,
    attend_w_1,
    attend_w_2,
    attend_w_3,
    attend_w_4,
    attend_w_5,
    attend_w_6,
  } = member;

  const schedule = [
    {day: 'MON', classes: checkSchedule(attend_1, attend_s_1, attend_w_1, attend_v_1)},
    {day: 'TUE', classes: checkSchedule(attend_2, attend_s_2, attend_w_2, attend_v_2)},
    {day: 'WED', classes: checkSchedule(attend_3, attend_s_3, attend_w_3, attend_v_3)},
    {day: 'THU', classes: checkSchedule(attend_4, attend_s_4, attend_w_4, attend_v_4)},
    {day: 'FRI', classes: checkSchedule(attend_5, attend_s_5, attend_w_5, attend_v_5)},
    {day: 'SAT', classes: checkSchedule(attend_6, attend_s_6, attend_w_6, attend_v_6)},
  ];

  return schedule;
}

function checkSchedule(reading: '0' | '1', speaking: '0' | '1', writing: '0' | '1', voca: '0' | '1') {
  const schedule = [];

  if (reading === '1') schedule.push('Reading');
  if (speaking === '1') schedule.push('Speaking');
  if (writing === '1') schedule.push('Writing');
  if (voca === '1') schedule.push('Voca');

  if (schedule.length < 4) {
    for (let i = schedule.length; i < 4; i++) {
      schedule.push('');
    }
  }
  return schedule;
}

const scheduleIcon = {
  Reading: <VIcon type="Ionicons" name="book" color="#6EC3FF" size={calcResponsive(30)} />,
  Speaking: <VIcon type="Ionicons" name="ios-chatbubbles" color="#6EC3FF" size={calcResponsive(30)} />,
  Writing: <VIcon type="FontAwesome" name="pencil" color="#6EC3FF" size={calcResponsive(30)} />,
  Voca: <VIcon type="MaterialCommunityIcons" name="alphabet-latin" color="#6EC3FF" size={calcResponsive(30)} />,
};

interface schedule {
  day: string;
  classes: string[];
}

const Schedule = () => {
  const [member, setMemebr] = useAtom(memberState);
  const [schedule, setSchedule] = useState<schedule[]>();
  console.log('member');
  console.log(member);

  useEffect(() => {
    const newSchedule = getSchedule(member);
    setSchedule(newSchedule);
  }, [member]);

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 90}}>
      {schedule?.map(today => {
        return (
          <Row key={today.day}>
            <DayView>
              <NotoText fw="Bold">{today.day}</NotoText>
            </DayView>
            {today.classes.map((_class, index) => {
              return (
                <ClassView key={today.day + index}>
                  {_class !== '' && (
                    <ClassBox>
                      {scheduleIcon[_class] ?? <View />}
                      <NotoText mt={5} ftColor="#6EC3FF">
                        {_class}
                      </NotoText>
                    </ClassBox>
                  )}
                </ClassView>
              );
            })}
          </Row>
        );
      })}
      {/* {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => {
        return (
          <Row key={day} style={{backgroundColor: 'red'}}>
            <DayView>
              <NotoText fw="Bold">{day}</NotoText>
              <NotoText style={{textAlign: 'center'}} fs={8}>
                09:30{'\n'} ~ {'\n'}12:30
              </NotoText>
            </DayView>
            {['', '', '', ''].map((i, index) => {
              return <ClassView key={day + index}></ClassView>;
            })}
          </Row>
        );
      })} */}
    </ScrollView>
  );
};

export default Schedule;
