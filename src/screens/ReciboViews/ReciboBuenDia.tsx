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

import fonts from '../../utils/fonts';
import IMAGEBACKGROUND from '../../assets/images/Ellipse.png';
import { RootStackParamList } from '../../types/navigation';
import Header from '../Details/components/Header';
import { usePredio } from '../../utils/predio';
import colors from '../../utils/colors';

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'imprimirPago'>;

const Pago = () => {
  const [predio] = usePredio();
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  return (
    <View style={styles.Background}>
      <Header
        onPress={() => navigation.goBack()}
      />

      <View style={styles.msgContainer}>
        <Text style={styles.txtItem}>Descargando Recibo Salvo Buen Cobro</Text>
        <Text style={styles.txtItem2}>espere un momento...</Text>
      </View>

      <View>
        <WebView
          source={{ uri: predio?.pago?.recibo_salvo_buen_cobro }}
        />
      </View>
    </View>
  )
}

export default Pago

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: colors.secundary,
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
    fontSize: 24,
    fontFamily: fonts.extraBold,
    color: '#ffffff',
  },
  txtItem2: {
    fontSize: 18,
    fontFamily: fonts.medium,
    color: '#ffffff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  msgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})