import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';

type Props = NativeStackScreenProps<RootStackParamsList, screens.details>;

const Details: React.FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});
