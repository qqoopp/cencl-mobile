import {useEffect, useState} from 'react';

interface Return {
  seconds: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
}

export const useTimer = (): Return => {
  const [seconds, setSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isCounting) {
      setTimeout(() => {
        setSeconds(seconds + 1);
      }, 1000);
    }
  }, [seconds]);

  const startTimer = () => {
    setIsCounting(true);

    setSeconds(1);
  };

  const stopTimer = () => {
    setIsCounting(false);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsCounting(false);
  };

  return {
    seconds,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
