import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../navigation/RootNavigion';
import {screens} from '../constants/screens';

type Props = NativeStackScreenProps<RootStackParamsList, screens.gallery>;

const Gallery: React.FunctionComponent<Props> = () => {
  return (
    <View>
      <Text>Gallery</Text>
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({});
