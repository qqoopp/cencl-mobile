import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'styled-components/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Modal, Text, TextInput} from 'react-native';
import {theme} from './src/theme/theme';
import {navigationRef} from './src/utils/rootNavigations';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootScreens from '@/navigations/rootStack';

// --------------------------  react-native api 기본 props 지정    -----------------------------------

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean; autoCorrect?: boolean};
}
(Text as unknown as TextWithDefaultProps).defaultProps = (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps = (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.autoCorrect = false;

interface ModalWithDefaultProps extends Modal {
  defaultProps?: {
    animationType?: 'fade' | 'none' | 'slide';
    statusBarTranslucent?: boolean;
    transparent?: boolean;
  };
}
(Modal as unknown as ModalWithDefaultProps).defaultProps = (Modal as unknown as ModalWithDefaultProps).defaultProps || {};
(Modal as unknown as ModalWithDefaultProps).defaultProps!.animationType = 'fade';
(Modal as unknown as ModalWithDefaultProps).defaultProps!.statusBarTranslucent = true;
(Modal as unknown as ModalWithDefaultProps).defaultProps!.transparent = true;

// ---------------------------------------------------------------

const queryClient = new QueryClient();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <NavigationContainer ref={navigationRef}>
            <QueryClientProvider client={queryClient}>
              <RootScreens />
            </QueryClientProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
