import Divider from '@/components/atoms/divider';
import NotoText from '@/components/atoms/text/notoText';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import memberState from '@/states/memberState';
import {color, ftSizes} from '@/theme/theme';
import React from 'react';
import {Platform, ScrollView, View} from 'react-native';
import {useAtom, useAtomValue} from 'jotai';
import {Title, InfoCol} from './style';

type infoType = 'basicInfo' | 'contact' | 'childInfo';
const infoTypes: Array<infoType> = ['basicInfo', 'contact', 'childInfo'];

const MemberInfo = () => {
  const member = useAtomValue(memberState);
  console.log('member : ', member);
  const basicInfo = [
    {title: '캠퍼스', value: member.shop_name},
    {title: '반(Class)', value: member.item_name},
    {title: '아이디', value: member.mem_id},
    {title: '가입일자', value: member.join_date},
    {title: '앱마켓 계정ID', value: Platform.OS === 'android' ? member.email_google : member.email_apple},
  ];
  const contact = [
    {title: '휴대폰', value: member.mem_tel},
    {title: '전화번호', value: member.mem_phone},
    {title: '이메일', value: member.mem_email},
    {title: '주소', value: member.mem_addr2},
  ];

  const childInfo = [
    {title: '이름', value: member.mem_name},
    {title: '성별', value: member.mem_sex},
    {title: '학교', value: member.school_name},
    {title: '학년', value: member.school_grade},
  ];

  return (
    <ScreenBg isDivider isHeader headerTitle="회원정보">
      <ScrollView>
        {[
          {title: '기본 정보', values: basicInfo},
          {title: '연락처 정보', values: contact},
          {title: '자녀 정보', values: childInfo},
        ].map(({title, values}, index) => {
          return (
            <View key={title}>
              <NotoText fs={ftSizes.m} ml={20} fw="Medium" mt={16}>
                {title}
              </NotoText>
              {values.map(({title, value}, index) => {
                return (
                  <InfoCol key={title}>
                    <Row>
                      <Title>{title}</Title>
                      <NotoText ftColor={color.dark_gray}>{value}</NotoText>
                    </Row>
                    <Divider h={1} />
                  </InfoCol>
                );
              })}
              <Divider />
            </View>
          );
        })}
      </ScrollView>
    </ScreenBg>
  );
};

export default MemberInfo;

{
  /* {
              //       values.map(({title, value}, index) => {
              //         return (
              //           <InfoCol key={title}>
              //             <Row>
              //               <Title>{title}</Title>
              //               <NotoText ftColor={color.dark_gray}>{value}</NotoText>
              //             </Row>
              //             <Divider h={1} />
              //           </InfoCol>
              //         );
              //       });
              //     }
              //   })} */
}
