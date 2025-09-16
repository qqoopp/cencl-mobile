import React from 'react';
import {color, ftSizes, metrics, shadow} from '@/theme/theme';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import Home from '@/components/screens/home';
import ParentsPage from '@/components/screens/parentsPage';
import Notification from '@/components/screens/notification';
import Row from '@/components/blocks/view/row';
import {logo_white} from '@/assets/img';
import styled from 'styled-components/native';
import Col from '@/components/blocks/view/col';
import NotoText from '@/components/atoms/text/notoText';

const Logo = styled.Image`
  width: 36px;
  height: 36px;
`;

export type TabStackParams = {
  homeStackTab: undefined;
  noticeTab: undefined;
  parentsPageTab: undefined;
  myPageTab: undefined;
};

const Tab = createBottomTabNavigator<TabStackParams>();

const TabScreens = () => {
  return (
    <>
      <Row
        style={{
          height: 56 + metrics.statusBarHeight,
          width: metrics.screenWidth,
          backgroundColor: color.main,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingTop: metrics.statusBarHeight,
        }}>
        <Logo source={logo_white} />
        <Col style={{alignItems: 'flex-end'}}>
          <NotoText fw="Medium" fs={ftSizes.xxs} mb={5} ftColor={color.white}>
            100인, 100색 1:1 맞춤 영어 독서 지도
          </NotoText>
          <NotoText fw="Bold" fs={ftSizes.s} ftColor={color.white}>
            원서 읽기 최강자, 센클 영어도서관
          </NotoText>
        </Col>
      </Row>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: color.main,
          tabBarInactiveTintColor: color.dark_gray,

          tabBarStyle: [
            {
              height: 56,
              bottom: 25,
              width: metrics.screenWidth * 0.9,
              marginLeft: metrics.screenWidth * 0.1 * 0.5,
              borderRadius: 50,
              position: 'absolute',
            },
            shadow.shallow,
          ],
          tabBarItemStyle: {
            height: 50,
            marginTop: 3,
          },
          tabBarLabelStyle: {
            marginBottom: 5,
          },
          tabBarIconStyle: {
            backgroundColor: 'green',
          },
        }}>
        <Tab.Screen
          name="homeStackTab"
          component={Home}
          options={{
            tabBarLabel: '홈',
            tabBarIcon: ({color}) => <Icon name="home" size={25} color={color} />,
          }}
        />
        <Tab.Screen
          name="noticeTab"
          component={Notification}
          options={{
            tabBarLabel: '알림',
            tabBarIcon: ({color}) => <Icon name="bell" size={25} color={color} />,
          }}
        />
        <Tab.Screen
          name="parentsPageTab"
          component={ParentsPage}
          options={{
            tabBarLabel: '부모 페이지',
            tabBarIcon: ({color}) => <IonicIcon name="person-outline" size={25} color={color} />,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabScreens;
