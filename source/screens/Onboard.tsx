import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';

type Props = NativeStackScreenProps<RootStackParamsList, screens.onboarding>;

const Onboard: React.FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Onboard</Text>
    </View>
  );
};

export default Onboard;

const styles = StyleSheet.create({});
