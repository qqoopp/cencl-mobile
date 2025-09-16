import React, {Suspense, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '@/components/screens/login';
import SignUp from '@/components/screens/signUp';
import RequestPush from '@/components/screens/requestPush';
import CompleteSignUp from '@/components/screens/completeSignUp';
import Iap from '@/components/screens/iap';
import TabScreens from './tab';
import Notification from '@/components/screens/notification';
import ListeningTraining from '@/components/screens/listeningTraining';
import LearningHistory from '@/components/screens/learningHistory';
import RftList from '@/components/screens/rftList';
import ReadingTraining from '@/components/screens/readingTraining';
import ReadingSkillResults from '@/components/screens/readingSkillResults';
import MngtSubscribe from '@/components/screens/mngtSubscribe';
import PointHistory from '@/components/screens/pointHistory';
import Report from '@/components/screens/report';
import MemberInfo from '@/components/screens/memberInfo';
import Consulting from '@/components/screens/consulting';
import GrowthHistory from '@/components/screens/growthHistory';
import Splash from '@/components/screens/splash';
import VocaTest from '@/components/screens/vocaTest';
import {ActivityIndicator} from 'react-native';
import TestResultBoard from '@/components/screens/testResultBoard';
import {useFcm} from '@/hooks/useFcm';
import WaitingAccept from '@/components/screens/waitingAccept';
import TrackPlayer from 'react-native-track-player';

export type RootStackParams = {
  splash: undefined;
  player: undefined;
  login: undefined;
  iap: undefined;
  signUp: undefined;
  requestPush: undefined;
  completeSignUp: undefined;
  tabScreens: undefined;
  vocaTest: {
    date: string;
  };
  notice: undefined;
  rftList: {
    date: string;
  };
  learningHistory: {
    category?: 'Reading' | 'Speaking' | 'Writing';
  };
  readingSkillResults: undefined;
  mngtSubscribe: undefined;
  pointHistory: undefined;
  report: undefined;
  memberInfo: undefined;
  consulting: undefined;
  growthHistory: undefined;
  waitingAccept: undefined;
  testResultBoard: {
    score: string;
    seconds: string;
    type: 'voca' | 'rft' | 'recording';
    rft?: rft;
  };
  readingTraining: {
    rft: rft;
  };
  listeningTraining: {
    type: 'rft' | 'recording' | 'sample';
    rft?: rft;
    reading?: reading;
    recordUri?: string;
  };
};
const Stack = createStackNavigator<RootStackParams>();

const RootScreens = () => {
  useEffect(() => {
    setUpTrackPlayer();
  }, []);
  const setUpTrackPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
    } catch (error) {}
  };
  useFcm();
  return (
    <Suspense fallback={<ActivityIndicator style={{width: 100, height: 100}} />}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="growthHistory" component={GrowthHistory} />
        <Stack.Screen name="rftList" component={RftList} />
        <Stack.Screen name="tabScreens" component={TabScreens} />
        <Stack.Screen name="requestPush" component={RequestPush} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="testResultBoard" component={TestResultBoard} />
        <Stack.Screen name="consulting" component={Consulting} />
        <Stack.Screen name="memberInfo" component={MemberInfo} />
        <Stack.Screen name="waitingAccept" component={WaitingAccept} />
        <Stack.Screen name="report" component={Report} />
        <Stack.Screen name="learningHistory" component={LearningHistory} />
        <Stack.Screen name="readingSkillResults" component={ReadingSkillResults} />
        <Stack.Screen name="pointHistory" component={PointHistory} />
        <Stack.Screen name="mngtSubscribe" component={MngtSubscribe} />
        <Stack.Screen name="readingTraining" component={ReadingTraining} />
        <Stack.Screen name="vocaTest" component={VocaTest} />
        <Stack.Screen name="notice" component={Notification} />
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen name="completeSignUp" component={CompleteSignUp} />
        <Stack.Screen name="listeningTraining" component={ListeningTraining} />
        <Stack.Screen name="iap" component={Iap} />
      </Stack.Navigator>
    </Suspense>
  );
};

export default RootScreens;
