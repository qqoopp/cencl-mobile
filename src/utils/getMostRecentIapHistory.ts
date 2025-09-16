import React from 'react';
import {initConnection, endConnection, getPurchaseHistory} from 'react-native-iap';

export const getMostRecentIapHistory = async () => {
  try {
    console.log('과거 구입내역 구해와');

    await initConnection();
    const history = await getPurchaseHistory({automaticallyFinishRestoredTransactions: true});
    await endConnection();

    console.log('history : ', history);

    if (history.length > 0) {
      let maxTiemStamp = 0;
      let maxI = 0;
      for (let i = 0; i < history.length; i++) {
        if (history[i].transactionDate > maxTiemStamp) {
          maxTiemStamp = history[i].transactionDate;
          maxI = i;
        }
      }

      console.log('return hisotry ');
      console.log(history[maxI]);
      return history[maxI];
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
