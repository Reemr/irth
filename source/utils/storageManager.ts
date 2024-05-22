import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import en from '../constants/en';

export const setStorageValue = async (key: string, value: any) => {
  try {
    const _value = JSON.stringify(value);
    await AsyncStorage.setItem(key, _value);
  } catch (error) {
    Alert.alert(en.errors.storageError);
  }
};

export const getStorageValue = async (key: string) => {
  try {
    const _item: string | null = await AsyncStorage.getItem(key);
    const item = _item ? JSON.parse(_item) : _item;
    return item;
  } catch (error) {
    Alert.alert(en.errors.storageError);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    Alert.alert(en.errors.storageError);
  }
};

export const clearStorageByKey = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Alert.alert(en.errors.storageError);
  }
};

export const clearStorageByMultipleKeys = async (keys: string[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    Alert.alert(en.errors.storageError);
  }
};
