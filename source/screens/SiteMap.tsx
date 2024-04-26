import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';

type Props = NativeStackScreenProps<RootStackParamsList, screens.siteMap>;

const SiteMap: React.FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>SiteMap</Text>
    </View>
  );
};

export default SiteMap;

const styles = StyleSheet.create({});
