import {color, metrics} from '@/theme/theme';
import React, {useRef, useState} from 'react';
import {Alert, Linking, Platform, TouchableOpacity, View} from 'react-native';
import SendIntentAndroid from 'react-native-send-intent';
import WebView from 'react-native-webview';
import {ShouldStartLoadRequest, WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';
import VIcon from '../atoms/vIcon';
import NotoText from '../atoms/text/notoText';
import {err} from 'react-native-svg/lib/typescript/xml';

const FullScreenWebView = ({uri, closeModal}: {uri: string; closeModal: () => void}) => {
  const wevViewRef = useRef<WebView>();

  const onShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    console.log('event : ', event);
    try {
      if (event.url.startsWith('http://') || event.url.startsWith('https://') || event.url.startsWith('about:blank')) {
        return true;
      }

      if (Platform.OS === 'android') {
        console.log('여기서 열자');
        SendIntentAndroid.openAppWithUri(event.url)
          .then(isOpened => {
            console.log('isOpend : ', isOpened);
            if (!isOpened) {
              Alert.alert('앱 실행에 실패했습니다');
            }
          })
          .catch(err => {
            console.log(err);
          });
        console.log('여기 시점');
        return false;
      } else {
        Linking.openURL(event.url).catch(err => {
          Alert.alert('앱 실행에 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.');
        });
        return false;
      }
    } catch (error) {
      closeModal();
      return false;
      console.log('캐치캐치');
    }
  };

  return (
    <>
      <View style={{height: metrics.statusBarHeight + 50, width: metrics.screenWidth, backgroundColor: color.white}} />
      <WebView
        style={{flex: 1}}
        ref={ref => (wevViewRef.current = ref)}
        source={{uri: uri}}
        allowFileAccess={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        geolocationEnabled={true}
        saveFormDataDisabled={true}
        allowFileAccessFromFileURLS={true}
        allowUniversalAccessFromFileURLs={true}
        setSupportMultipleWindows={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        mixedContentMode={'compatibility'}
        originWhitelist={['*']}
        onError={async error => {
          wevViewRef.current?.goBack();
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      />

      <TouchableOpacity onPress={closeModal} style={{position: 'absolute', top: metrics.statusBarHeight + 20, right: 20}}>
        <VIcon type="Octicons" name="x" size={24} />
      </TouchableOpacity>
    </>
  );
};

export default FullScreenWebView;
