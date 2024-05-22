import React, {useEffect, useState} from 'react';
import RootNavigion from './source/navigation/RootNavigion';
import {ActivityIndicator, StatusBar} from 'react-native';
import colors from './source/themes/colors';
import {getStorageValue} from './source/utils/storageManager';
import storageKeys from './source/constants/storageKeys';
import Loader from './source/components/Loader';

const App = () => {
  const [isOnboardCompleted, setIsOnboardCompleted] = useState(false);
  const [isLocalDataLoaded, setIsLocalDataLoaded] = useState(false);

  const getOnboardState = async () => {
    let onboardState = await getStorageValue(storageKeys.onboardCompleted);
    if (onboardState) {
      setIsOnboardCompleted(true);
    }
    setIsLocalDataLoaded(true);
  };

  useEffect(() => {
    getOnboardState();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={colors.transparent}
        translucent={true}
        barStyle={'dark-content'}
      />
      {isLocalDataLoaded ? (
        <RootNavigion isOnboardCompleted={isOnboardCompleted} />
      ) : (
        <Loader bgColor={colors.white} loaderColor={colors.black} />
      )}
    </>
  );
};

export default App;
