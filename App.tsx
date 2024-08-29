import React, {useEffect, useState} from 'react';
import RootNavigion from './source/navigation/RootNavigion';
import {StatusBar} from 'react-native';
import colors from './source/themes/colors';
import {getStorageValue} from './source/utils/storageManager';
import storageKeys from './source/constants/storageKeys';
import Loader from './source/components/Loader';
import {Provider} from 'react-redux';
import store from './source/redux/store';

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
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
