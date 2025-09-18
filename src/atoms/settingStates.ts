import {deviceDB} from '@/utils/deviceDB';
import {getCountry} from 'react-native-localize';
import { atom } from 'jotai';

export type systemLanguage = 'ko' | 'en' | 'vi' | 'th' | 'zh-Hans' | 'zh-Hant' | 'ja' | 'el' | 'tr' | 'id' | 'es' | 'pt' | 'it' | 'de' | 'fr' | 'ru' | 'hi' | 'ar';

export const initialSettingStates: {
  language: systemLanguage;
  bookLanguage: 'English' | '한국어';
} = {
  language: 'en',
  bookLanguage: 'English',
};

// jotai atom (key 필요 없음)
const settingAtom = atom(initialSettingStates);

export default settingAtom;
