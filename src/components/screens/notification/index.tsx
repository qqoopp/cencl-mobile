import Title from '@/components/atoms/text/title';
import Col from '@/components/blocks/view/col';
import ScreenBg from '@/components/blocks/bg/screenBg';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import OIcon from 'react-native-vector-icons/Octicons';

import React from 'react';
import NotoText from '@/components/atoms/text/notoText';
import {color, ftSizes, metrics} from '@/theme/theme';
import {AlarmIcon, AnnounceIconBox, AnnounceTitle, NavBtn, NavRow, NavText, NoticeRow, NoticeRowBtn, styles} from './style';
import Divider from '@/components/atoms/divider';
import {FlatList, Image, Modal, TouchableOpacity} from 'react-native';
import {useNotification} from './useNotification';
import WebView from 'react-native-webview';
import Config from 'react-native-config';
import {alarmIcon} from '@/assets/icon';
import {logo} from '@/assets/img';

const Notification = () => {
  const {nowNotiType, alarms, notices, uri, modal, onPressAlarmBtn, onPressNoticeBtn, onPressNotiTypeBtn} = useNotification();

  return (
    <>
      <ScreenBg isStatusBarUse>
        <Title mt={15} ml={20} mb={10}>
          알림
        </Title>
        <NavRow>
          <NavBtn onPress={() => onPressNotiTypeBtn('공지사항')} isOn={nowNotiType === '공지사항'}>
            <NavText fw="Medium" isOn={nowNotiType === '공지사항'}>
              공지사항
            </NavText>
          </NavBtn>
          <NavBtn onPress={() => onPressNotiTypeBtn('알림메세지')} isOn={nowNotiType === '알림메세지'}>
            <NavText fw="Medium" isOn={nowNotiType === '알림메세지'}>
              알림메세지
            </NavText>
          </NavBtn>
        </NavRow>
        <Divider />
        {nowNotiType === '알림메세지' ? (
          <FlatList
            contentContainerStyle={styles.contenetContainer}
            data={alarms}
            renderItem={({item, index}) => {
              console.log('item : ', item);
              return <Alarm onPress={onPressAlarmBtn} alarm={item} key={item.title + index} />;
            }}
          />
        ) : (
          <FlatList
            contentContainerStyle={styles.contenetContainer}
            data={notices}
            renderItem={({item, index}) => {
              return <Noti noti={item} onPress={onPressNoticeBtn} key={item.title + index} />;
            }}
          />
        )}
      </ScreenBg>
      <Modal visible={modal.isVisible} onRequestClose={modal.close}>
        <WebView
          style={{
            flex: 1,
            marginTop: metrics.statusBarHeight,
          }}
          source={{uri: Config.WEBVIEW_BASE_URL + `_module/lms/notice/showNotice.php?idx=${uri}`}}
        />
        <TouchableOpacity
          onPress={modal.close}
          style={{
            position: 'absolute',
            top: metrics.statusBarHeight + 10,
            right: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <OIcon name="x" size={25} color={color.dark_gray} />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default Notification;

interface alarmProps {
  alarm: alarm;
  onPress: (alarm: alarm) => void;
}

const Alarm = ({alarm, onPress}: alarmProps) => {
  console.log('alarm : ', alarm);
  return (
    <>
      <NoticeRowBtn disabled onPress={() => onPress(alarm)}>
        <AlarmIcon source={alarmIcon[alarm.alarm_div] ?? logo} style={{width: 40, height: 40}} />
        <Col>
          <AnnounceTitle style={{fontSize: ftSizes.s}}>{alarm.content}</AnnounceTitle>
          <NotoText ftColor={color.dark_gray} fs={ftSizes.xs}>
            {alarm.date}
          </NotoText>
        </Col>
      </NoticeRowBtn>
      <Divider h={1} />
    </>
  );
};

interface notiProps {
  noti: notice;
  onPress: (notice: notice) => void;
}

const Noti = ({noti, onPress}: notiProps) => {
  return (
    <>
      <NoticeRowBtn isAnnouncement onPress={() => onPress(noti)}>
        <Col>
          <AnnounceTitle>{noti.title}</AnnounceTitle>
          <NotoText ftColor={color.dark_gray} fs={ftSizes.xs}>
            {noti.date}
          </NotoText>
        </Col>
        <Icon name="arrow-right" />
      </NoticeRowBtn>
      <Divider h={1} />
    </>
  );
};
