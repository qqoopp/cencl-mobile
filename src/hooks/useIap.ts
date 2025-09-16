import {useEffect, useState} from 'react';
import {EmitterSubscription, Platform} from 'react-native';
import {subscribeInfoFetch} from '@/api/subscribe';
import {
  finishTransaction,
  endConnection,
  Subscription,
  getPurchaseHistory,
  requestSubscription,
  clearProductsIOS,
  clearTransactionIOS,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  getSubscriptions,
  SubscriptionPurchase,
} from 'react-native-iap';
import {useAtomValue} from 'jotai';
import memberState from '@/states/memberState';
import {navigate} from '@/utils/rootNavigations';
import {useModal} from './useModal';
import SimpleToast from 'react-native-simple-toast';

let purchaseUpdateSubscription: EmitterSubscription;
let purchaseErrorSubscription: EmitterSubscription;
const itemCodes = Platform.OS === 'android' ? ['regular_payment'] : ['cenman_mobile_month001'];

export const useIap = () => {
  const member = useAtomValue(memberState);
  const modal = useModal<'webview'>();
  const [isConnected, setIsConnected] = useState(false);
  const [products, setProducts] = useState<Subscription[]>([]);
  const [webviewUri, setWebviewUri] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    async function connectTo() {
      console.log('인앱결제 연결 시도');
      if (Platform.OS === 'ios') {
        await clearProductsIOS();
        await clearTransactionIOS();
      }
      try {
        const connected = await initConnection();
        console.log('connected : ', connected);
        if (Platform.OS === 'android') {
          await flushFailedPurchasesCachedAsPendingAndroid();
        } else {
          await clearTransactionIOS();
        }
        setIsConnected(true);
      } catch (err) {}
    }

    connectTo();

    return () => {
      endConnection();
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (isConnected) {
      getProducts();
    }
  }, [isConnected]);

  const getProducts = async () => {
    const products = await getSubscriptions({skus: itemCodes});
    setProducts(products);
  };

  const onPressTerms = (uri: string) => {
    modal.changeType('webview');
    setWebviewUri(uri);
  };

  const getPurcahstRecord = async () => {
    const history = await getPurchaseHistory();
  };

  const subscribe = async () => {
    try {
      if (Platform.OS === 'android') {
        console.log(products[0]);
        const sku = products[0].productId;
        const offerToken = products[0].subscriptionOfferDetails[0].offerToken;
        setIsPaying(true);
        const response = await requestSubscription({
          sku,
          subscriptionOffers: [{sku, offerToken}],
        });
        const _response = response[0];
        console.log('response [  ', response, ' ]');
        if (_response) {
          uploadPurchase(_response);
        } else {
          SimpleToast.show('결제애 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      } else {
        console.log('products : ', products);
        const sku = products[0].productId;
        setIsPaying(true);
        const response = await requestSubscription({
          sku,
        });

        if (response) {
          uploadPurchase(response);
        } else {
          SimpleToast.show('결제애 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    } catch (error) {
      setIsPaying(false);
      SimpleToast.show('결제 실패');
      console.log(error);
    }
  };

  const uploadPurchase = async (purchase: SubscriptionPurchase) => {
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        console.log('purchaseUpdatedListener 액션끝');
        await finishTransaction({purchase});

        const {data} =
          Platform.OS === 'android'
            ? await subscribeInfoFetch({mem_id: member.mem_id, purchaseToken: purchase.purchaseToken, newPurchace: '1'})
            : await subscribeInfoFetch({mem_id: member.mem_id, receiptData: receipt, newPurchace: '1'});
        console.log(' data : ', data);
        setIsPaying(false);
        if (data.state === 'success') {
          navigate('tabScreens');
        }
      } catch (ackErr) {
        SimpleToast.show('결제 실패', SimpleToast.SHORT);
        setIsPaying(false);
        console.error(ackErr);
      }
    }
  };

  return {modal, webviewUri, isPaying, isConnected, onPressTerms, getPurcahstRecord, subscribe};
};
