import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, Theme, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DropdownAlert from 'react-native-dropdownalert';

import { RootStackParamList } from './src/types/navigation';
import DropdownalertContext from './src/context/Dropdownalert';
import { AlertNotification } from './src/types/alert';
import { PredioProps } from './src/types/api';
import PredioContext from './src/context/Predio';

// Screens
import SearchScreen from './src/screens/Search';
import HomeScreen from './src/screens/Home';
import PagoHome from './src/screens/Pago';
import DetailsScreen from './src/screens/Details';
import ImprimirPagoScreen from './src/screens/ImprimirPago';

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
};

// Initialize the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  // Refs
  const notificationRef = useRef<DropdownAlert>(null);

  // States
  const [notification, setNotification] = useState<AlertNotification | null>(null);
  const [predio, setPredio] = useState<PredioProps | null>(null);

  // Effects
  useEffect(() => {
    if (notification && notificationRef.current) {
      notificationRef.current.alertWithType(
        notification.type,
        notification.title,
        notification.message,
      );
    }
  }, [notification]);

  const dropdownAlertContextValue = useMemo(() => ({
    setNotification,
    notification,
  }), [notification]);

  const predioContextValue = useMemo(() => ({
    setPredio,
    predio,
  }), [predio]);

  return (
    <>
      <DropdownalertContext.Provider
        value={dropdownAlertContextValue}
      >
        <PredioContext.Provider
          value={predioContextValue}
        >
          <NavigationContainer
            theme={theme}
          >
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="search" component={SearchScreen} />
              <Stack.Screen name="home" component={HomeScreen} />
              <Stack.Screen name="pago" component={PagoHome} />
              <Stack.Screen name="imprimirPago" component={ImprimirPagoScreen} />
              <Stack.Screen name="details" component={DetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </PredioContext.Provider>
      </DropdownalertContext.Provider>

      <DropdownAlert
        ref={notificationRef}
        onClose={() => setNotification(null)}
        updateStatusBar={false}
      />
    </>
  );
};

export default () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppContainer />
  );
};
