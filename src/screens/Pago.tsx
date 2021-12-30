import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';

import fonts from '../utils/fonts';
import IMAGEBACKGROUND from '../../assets/images/Ellipse.png';
import { RootStackParamList } from '../types/navigation';
import Header from './Details/components/Header';
import { usePredio } from '../utils/predio';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'pago'>;

const Pago = () => {
  const [predio] = usePredio();
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  const openPagoConTarjeta = () => {
    // Linking.openURL("https://u.mitec.com.mx/p/i/5Z4BF060");
    Linking.openURL(predio?.mit.url_movil_app);
  };
  const openImprimirPago = () => {
    Linking.openURL(predio?.url_orden_pago);
  };

  return (
    <View style={styles.Background}>
      {console.log(predio?.mit?.url_movil_app)}

      <Image style={styles.elipse} source={IMAGEBACKGROUND} />
      <Header
        onPress={() => navigation.goBack()}
      />
      <WebView
        source={{ uri: predio?.mit?.url_movil_app }}
        style={{ flex: 1 }}
      />
    </View>
  )
}

export default Pago

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  elipse: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  menuItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    minHeight: 57,
    width: '100%',
    borderRadius: 15,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 17,
    marginTop: 16,
  },
  txtItem: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: '#ffffff',
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  }
})
