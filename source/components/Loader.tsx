import React from 'react';
import {View, ActivityIndicator, StyleSheet, ColorValue} from 'react-native';
import colors from '../themes/colors';

type Props = {bgColor?: ColorValue; loaderColor?: ColorValue};

// app's common loader
const Loader = ({bgColor, loaderColor}: Props) => {
  return (
    <View
      style={[
        styles.loader,
        {backgroundColor: bgColor ? bgColor : colors.modalBackground},
      ]}>
      <ActivityIndicator
        size="large"
        color={loaderColor ? loaderColor : colors.white}
      />
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
});
