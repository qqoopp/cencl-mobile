import {theme} from '@/theme/theme';

type ITheme = typeof theme;

declare interface StyledTheme extends marginProps {
  theme: ITheme;
}

declare interface marginProps {
  mt?: number;
  mb?: number;
  mr?: number;
  ml?: number;
}

declare interface ClientAxiosResponse<D = any> {
  data: D;
  msg: string;
  state: 'success' | 'fail';
  statusCode: string;
}
