import {logo} from '@/assets/img';
import BottomInput from '@/components/atoms/inputs/bottomInput';
import NotoText from '@/components/atoms/text/notoText';
import Col from '@/components/blocks/view/col';
import Row from '@/components/blocks/view/row';
import ScreenBg from '@/components/blocks/bg/screenBg';
import {color, metrics} from '@/theme/theme';
import React from 'react';
import {FlatList, KeyboardAvoidingView, Platform} from 'react-native';
import {DateView, MyChat, OtherChat, ProfileImage} from './style';
import {useConsulting} from './useConsulting';
import NotchView from '@/components/blocks/view/notchView';

const Consulting = () => {
  const {msgs, onPressMsgArrowBtn} = useConsulting();

  return (
    <>
      <KeyboardAvoidingView behavior={Platform.OS === 'android' ? null : 'padding'} style={{flex: 1}}>
        <ScreenBg isHeader headerTitle="1:1교육 상담" isDivider>
          <Col style={{paddingHorizontal: 8, transform: [{scaleY: -1}]}}>
            <FlatList
              data={msgs}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingTop: 66 + metrics.notchBottom}}
              renderItem={({item, index}) => {
                const prevMsgDate = msgs[index + 1]?.date ?? '';
                const nowMsgDate = item.date;
                const isSameDate = prevMsgDate === nowMsgDate;
                console.log('');
                const prevMsgTime = msgs[index + 1]?.date_write.split(' ')[1];
                const nowMsgTime = msgs[index].date_write.split(' ')[1];
                console.log('prevMsgTime', prevMsgTime);
                console.log('nowMsgTime', nowMsgTime);
                console.log('');
                // console.log('index : ', index);
                // console.log('prevMsgDate : ', prevMsgDate);
                // console.log('nowMsgDate : ', nowMsgDate);
                console.log('');

                const isSameTime = isSameDate === false ? false : prevMsgTime === nowMsgTime;

                return (
                  <Col style={{transform: [{scaleY: -1}]}}>
                    {(prevMsgDate === '' || !isSameDate) && (
                      <DateView>
                        <NotoText fs={12} ftColor={color.dark_gray}>
                          {nowMsgDate}
                        </NotoText>
                      </DateView>
                    )}
                    <SpeechBalloon time={isSameTime ? '' : nowMsgTime} key={item.seq_num} msg={item} isMy={item.isIncoming === '0'} />
                  </Col>
                );
              }}
            />
          </Col>
          <BottomInput placeholder="메세지를 입력해주세요." onPressMsgArowBtn={onPressMsgArrowBtn} />
        </ScreenBg>
      </KeyboardAvoidingView>
      <NotchView />
    </>
  );
};

export default Consulting;

const SpeechBalloon = ({isMy, msg, time = ''}: {isMy: boolean; msg: msg; time: string}) => {
  const _time = time?.split(':') ?? '';

  return isMy ? (
    <Row style={{alignSelf: 'flex-end', alignItems: 'flex-end', marginBottom: 4}}>
      {time && (
        <NotoText mr={8} fs={11} ftColor={color.dark_gray}>
          {_time[0]}:{_time[1]}
        </NotoText>
      )}

      <MyChat key={msg.seq_num}>
        <NotoText ftColor={color.white}>{msg.content}</NotoText>
      </MyChat>
    </Row>
  ) : (
    <Row
      style={{
        alignSelf: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: 4,
        width : metrics.screenWidth - 100
      }}>
      <ProfileImage source={logo} />
      <OtherChat>
        <NotoText>{msg.content}</NotoText>
      </OtherChat>
      {time && (
        <NotoText ml={8} fs={11} ftColor={color.dark_gray}>
          {_time[0]}:{_time[1]}
        </NotoText>
      )}
    </Row>
  );
};
