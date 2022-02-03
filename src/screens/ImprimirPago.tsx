import React from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';


import fonts from '../utils/fonts';
import IMAGEBACKGROUND from '../../assets/images/Ellipse.png';
import { RootStackParamList } from '../types/navigation';
import Header from './Details/components/Header';
import { usePredio } from '../utils/predio';
import colors from '../utils/colors';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'imprimirPago'>;

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
    <>
      <Header
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'search' }],
        })}
      />
      <View style={styles.Background}>
        {console.log(predio?.url_orden_pago)}
        <Text>
          Descargando la órden de pago
       </Text>

        <Text2>
          espere un momento...
       </Text2>
        <View>
          <WebView
            source={{ uri: predio?.url_orden_pago }}
            style={{}}
          />
        </View>
      </View>
    </>
  )
}

export default Pago

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    padding: 20,
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

  container: {
    flex: 1,
    padding: 20,
  }
})

const Text = styled.Text`
  text-align: center;
  font-family: ${fonts.extraBold};
  font-size: 25px;
  color: #ffffff;
`;

const Text2 = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-family: ${fonts.medium};
  font-size: 20px;
  color: #ffffff;
`;
