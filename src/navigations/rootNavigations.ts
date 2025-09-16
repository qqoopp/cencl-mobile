import {createNavigationContainerRef, CommonActions, StackActions} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
  console.log(navigationRef);
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function replace(name: string, params?: object | undefined) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
}

export function goBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
}

export function getRootState() {
  if (navigationRef.isReady()) {
    return navigationRef.getParent();
  }
}

let isReset = false;

export function resetNavigation(screen = 'login') {
  if (navigationRef.isReady()) {
    isReset = true;
    setTimeout(() => {
      isReset = false;
    }, 1000);
    navigationRef.dispatch({
      ...CommonActions.reset({
        index: 0,
        routes: [{name: screen}],
      }),
    });
  }
}
