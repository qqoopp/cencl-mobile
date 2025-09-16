interface axiosData<D> {
  data: D;
  msg: string;
  state: 'success' | 'fail';
  statusCode: string;
}

import {theme} from '@/theme/theme';

type ITheme = typeof theme;

declare interface StyledTheme extends marginProps, paddingProps {
  theme: ITheme;
}

declare interface marginProps {
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
  m?: number;
}

declare interface paddingProps {
  pt?: number;
  pb?: number;
  pr?: number;
  pl?: number;
  p?: number;
}

declare type modalType =
  | 'alert'
  | 'ageGate'
  | 'webView'
  | 'reward'
  | 'shopItem'
  | 'systemLanguage'
  | 'readingLanguage'
  | 'delAccount'
  | 'editName'
  | 'pauseGame'
  | 'countDown'
  | 'gameTutorial'
  | 'gameResult'
  | 'selectAssistant'
  | null;
