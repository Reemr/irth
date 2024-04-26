import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';

type Props = NativeStackScreenProps<
  RootStackParamsList,
  screens.classification
>;

const Classification: React.FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Classification</Text>
    </View>
  );
};

export default Classification;

const styles = StyleSheet.create({});
