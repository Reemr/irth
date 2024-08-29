import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {screens} from '../constants/screens';
import Classification from '../screens/Classification';
import Details from '../screens/Details';
import Gallery from '../screens/Gallery';
import Onboard from '../screens/Onboard';
import SiteMap from '../screens/SiteMap';

export type RootStackParamsList = {
  Onboarding: undefined;
  SiteMap: undefined;
  Classification: {image: any};
  Gallery: undefined;
  Details: {detailId: string};
};

type Props = {isOnboardCompleted: boolean};

const Stack = createNativeStackNavigator<RootStackParamsList>();
const RootNavigion = ({isOnboardCompleted}: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isOnboardCompleted && (
          <Stack.Screen name={screens.onboarding} component={Onboard} />
        )}
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
