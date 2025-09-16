import {useRef, useState} from 'react';

export const useRefState = <T>(initialState: T): [T, T, (newState: T) => void] => {
  const [state, _setState] = useState(initialState);
  const stateRef = useRef(initialState);
  const setState = (newState: T) => {
    console.log('new State : ', newState);
    stateRef.current = newState;
    _setState(newState);
  };

  return [state, stateRef.current, setState];
};
