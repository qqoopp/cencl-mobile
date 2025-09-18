/**
 * @deprecated This function is deprecated. All FCM token logic is now handled in the `useFcm` hook to prevent race conditions at startup. 
 * Do not use this function.
 */
export const getDeviceToken = async (): Promise<string> => {
  console.warn('getDeviceToken is deprecated and should not be used.');
  return '';
};