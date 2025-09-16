import {UseMutationResult, useMutation} from 'react-query';

import {AxiosError, AxiosResponse} from 'axios';
import {loginFetch, loginParams} from '@/api/user';
import {ClientAxiosResponse} from '@/../type';
import SimpleToast from 'react-native-simple-toast';
import {subscribeInfoFetch} from '@/api/subscribe';
import {navigate, replace} from '@/utils/rootNavigations';
import {useSetAtom} from 'jotai';
import memberState from '@/states/memberState';
import {deviceDB} from '@/utils/deviceDB';
import {getMostRecentIapHistory} from '@/utils/getMostRecentIapHistory';
import {Platform} from 'react-native';
import isLoadingStates from '@/states/isLoadingStates';

interface Return {
  postLogin: UseMutationResult<AxiosResponse<ClientAxiosResponse<loginData[]>>, AxiosError, loginParams>;
}

export const useUserQuery = (): Return => {
  const setMember = useSetAtom(memberState);
  const setIsLoading = useSetAtom(isLoadingStates);

  const postLogin = useMutation<AxiosResponse<ClientAxiosResponse<loginData[]>>, AxiosError, loginParams>(loginFetch, {
    onSuccess: async ({data: {state, msg, data}}) => {
      if (state === 'success') {
        console.log('data : ', data);
        setMember(data[0]);
        const {
          data: {state, data: subscribeDate, msg},
        } = await subscribeInfoFetch({
          mem_id: data[0].mem_id,
        });

        if (data[0].join_status === '요청') {
          navigate('waitingAccept');
        } else if (data[0].join_status === '거절') {
          SimpleToast.show('가입 심사에서 거절된 계정입니다.');
        } else {
          if (state === 'fail') {
            setIsLoading({isLoading: true});
            const recentPurchaseHistory = await getMostRecentIapHistory();

            if (recentPurchaseHistory) {
              const {data: iapData} =
                Platform.OS === 'android'
                  ? await subscribeInfoFetch({
                      mem_id: data[0].mem_id,
                      purchaseToken: recentPurchaseHistory.purchaseToken,
                      newPurchace: '0',
                    })
                  : await subscribeInfoFetch({mem_id: data[0].mem_id, receiptData: recentPurchaseHistory.transactionReceipt, newPurchace: '0'});
              console.log('iapData :  ', iapData);
              if (iapData.state === 'success') {
                navigate('tabScreens');
                setIsLoading({isLoading: false});
              } else {
                await deviceDB('isKeepLogin', 'remove');
                navigate('iap');
                setIsLoading({isLoading: false});
              }
            } else {
              await deviceDB('isKeepLogin', 'remove');
              navigate('iap');
              setIsLoading({isLoading: false});
            }
          } else {
            replace('tabScreens');
          }
        }
      } else {
        SimpleToast.show(msg);
      }
    },
    onError: err => {
      console.log(err);
    },
  });

  return {
    postLogin,
  };
};
