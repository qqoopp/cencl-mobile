import {useEffect, useRef, useState} from 'react';
import {Platform} from 'react-native';
import {useRingerMode, RINGER_MODE, RingerModeType, getRingerMode} from 'react-native-ringer-mode';
export const useSoundMode = () => {
  const prevMode = useRef<undefined | RingerModeType>();
  const {mode, error, setMode} = useRingerMode();
  useEffect(() => {
    saveInitMode();
    return () => {
      console.log('나갈때');
      console.log('prevMode : ', prevMode);
      if (prevMode.current) setMode(prevMode.current);
    };
  }, []);
  const saveInitMode = async () => {
    try {
      if (Platform.OS === 'android') {
        const currentMode = await getRingerMode();
        console.log('____ currentMode : ', currentMode);
        prevMode.current = currentMode;
        makeSilentMode();
      }
    } catch (error) {}
  };
  const makeSilentMode = () => {
    console.log('무음모드ㅡ로');
    setMode(RINGER_MODE.vibrate);
  };
};