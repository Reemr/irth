import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screens} from '../constants/screens';
import Onboard from '../screens/Onboard';
import SiteMap from '../screens/SiteMap';
import Classification from '../screens/Classification';
import Gallery from '../screens/Gallery';
import Details from '../screens/Details';

export type RootStackParamsList = {
  Onboarding: undefined;
  SiteMap: undefined;
  Classification: undefined;
  Gallery: undefined;
  Details: undefined;
};

const RootNavigion = () => {
  const Stack = createNativeStackNavigator<RootStackParamsList>();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={screens.onboarding} component={Onboard} />
        <Stack.Screen name={screens.siteMap} component={SiteMap} />
        <Stack.Screen
          name={screens.classification}
          component={Classification}
        />
        <Stack.Screen name={screens.gallery} component={Gallery} />
        <Stack.Screen name={screens.details} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigion;
