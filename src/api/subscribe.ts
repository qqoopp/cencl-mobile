import {ClientAxiosResponse} from '@/../type';
import axios, {AxiosResponse} from 'axios';
import {Platform} from 'react-native';
import {clientAxios} from './axiosInstance';
import {subscribeInfoUrl} from './url';

export interface subscribeInfoParams {
  mem_id: string;
  receiptData?: string;
  purchaseToken?: string;
  newPurchace?: string;
}

export const subscribeInfoFetch = ({
  mem_id,
  receiptData,
  purchaseToken,
  newPurchace,
}: subscribeInfoParams): Promise<AxiosResponse<ClientAxiosResponse<subscribeInfoData>>> => {
  const form = new FormData();
  form.append('mem_id', mem_id);
  form.append('os', Platform.OS);
  form.append('receiptData', receiptData ?? '');
  form.append('purchaseToken', purchaseToken ?? '');
  form.append('newPurchace', newPurchace ?? '0');

  return clientAxios.post(subscribeInfoUrl, form);
};
