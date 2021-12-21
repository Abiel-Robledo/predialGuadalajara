import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './src/types/navigation';

// Configuration
const theme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    border: '#ECECEC',
    text: '#000000',
  },
}

// Screens
import HomeScreen from './src/screens/Home';

// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => (
  <NavigationContainer
    theme={theme}
  >
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppContainer />
  );
};
