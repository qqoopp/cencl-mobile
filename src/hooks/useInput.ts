import {Dispatch, SetStateAction, useState} from 'react';

export interface UseInput {
  value: string;
  isFocus: boolean;
  onChangeText: (e: string) => void;
  setValue: Dispatch<SetStateAction<string>>;
  setIsFocus: Dispatch<SetStateAction<boolean>>;
}

export const useInput = (
  initialVlaue: string,
  condition?: any,
  interceptors?: any,
) => {
  const [value, setValue] = useState(initialVlaue);
  const [isFocus, setIsFocus] = useState(false);

  const onChangeText = (e: string) => {
    let _value = e;
    let willUpdate = true;

    if (typeof interceptors === 'function' && typeof _value === 'string') {
      _value = interceptors(_value);
    }

    if (typeof condition === 'function') {
      willUpdate = condition(_value);
    }
    willUpdate && setValue(_value);
  };

  return {value, onChangeText, setValue, isFocus, setIsFocus};
};
