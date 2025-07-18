import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screen/HomeScreen';
import SendScreen from '../screen/SendScreen';
import SplashScreen from '../screen/SplashScreen';
import { navigationRef } from '../utils/NavigationUtil';
import ConnectionScreen from '../screen/ConnectionScreen';
import ReceiveScreen from '../screen/ReceiveScreen';
import ReceivedFileScreen from '../screen/ReceivedFileScreen';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName='SplashScreen'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ConnectionSreen" component={ConnectionScreen} />
        <Stack.Screen name="SendScreen" component={SendScreen} />
        <Stack.Screen name="ReceiveScreen" component={ReceiveScreen} />
        <Stack.Screen name="ReceivedFileScreen" component={ReceivedFileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
