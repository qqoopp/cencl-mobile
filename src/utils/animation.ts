import {Animated, Easing} from 'react-native';

export const jumpToNextSentence = ({floorX, runnerY, toValue, after}: {floorX: Animated.Value; runnerY: Animated.Value; toValue: number; after: () => void}) => {
  Animated.timing(floorX, {toValue, duration: 800, useNativeDriver: true}).start();
  Animated.timing(runnerY, {toValue: -60, duration: 300, useNativeDriver: true, easing: Easing.linear}).start(() => {
    Animated.timing(runnerY, {toValue: 0, duration: 500, useNativeDriver: true, easing: Easing.linear}).start(() => {
      after();
    });
  });
};

export const jumpToNextMeaning = ({floorX, runnerY, toValue, after}: {floorX: Animated.Value; runnerY: Animated.Value; toValue: number; after: () => void}) => {
  Animated.timing(floorX, {toValue, duration: 600, useNativeDriver: true}).start();
  Animated.timing(runnerY, {toValue: -40, duration: 200, useNativeDriver: true}).start(() => {
    Animated.timing(runnerY, {toValue: 0, duration: 400, useNativeDriver: true}).start(() => {
      after();
    });
  });
};

export const slideToNextMeaningBlink = ({floorX, runnderOpacity, toValue, after}: {floorX: Animated.Value; toValue: number; runnderOpacity: Animated.Value; after: () => void}) => {
  Animated.timing(floorX, {toValue: toValue, duration: 500, useNativeDriver: true}).start();
  Animated.timing(runnderOpacity, {toValue: 0, duration: 500, useNativeDriver: true}).start(() => {
    after();
  });
};

export const fallAndFlyToNextMeaning = ({floorX, runnerY, toValuxX, after}: {floorX: Animated.Value; runnerY: Animated.Value; toValuxX: number; after: () => void}) => {
  Animated.timing(floorX, {toValue: toValuxX, duration: 500, useNativeDriver: true}).start();
  Animated.timing(runnerY, {toValue: 120, duration: 500, useNativeDriver: true}).start(() => {
    Animated.timing(floorX, {toValue: toValuxX - 70, duration: 1800, useNativeDriver: true}).start();
    Animated.timing(runnerY, {toValue: -50, duration: 1800, useNativeDriver: true}).start(() => {
      Animated.timing(runnerY, {toValue: 0, duration: 300, useNativeDriver: true}).start(() => {
        after();
        //   checkIsEnd();
      });
    });
  });
};

export const goToGall = ({floorX, toValue, result}: {floorX: Animated.Value; toValue: number; result: () => void}) => {
  Animated.timing(floorX, {toValue, duration: 300, useNativeDriver: true}).start(() => {
    result();
  });
};

export const click = ({animated}: {animated: Animated.ValueXY}) => {
  Animated.loop(Animated.timing(animated, {toValue: {x: 0, y: 0}, duration: 1000, useNativeDriver: true})).start();
  // Animated.loop(Animated.timing(animated, { toValue: { x: 20, y: 20 }, duration: 300, useNativeDriver: true }).start()}}
};

export const shake = (component: Animated.Value) => {
  Animated.sequence([
    Animated.timing(component, {
      toValue: 5,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(component, {
      toValue: -5,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(component, {
      toValue: 5,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
    Animated.timing(component, {
      toValue: 0,
      duration: 100,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ]).start();
};
