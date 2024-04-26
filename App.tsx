import React from 'react';
import RootNavigion from './source/navigation/RootNavigion';
import {StatusBar} from 'react-native';
import colors from './source/themes/colors';

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={colors.transparent}
        translucent={true}
        barStyle={'dark-content'}
      />
      <RootNavigion />
    </>
  );
};

export default App;
