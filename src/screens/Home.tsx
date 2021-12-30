import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import IMAGEBACKGROUND from '../../assets/images/Ellipse.png';

import Header from '../components/Header';
import Button from '../components/Button';
import fonts from '../utils/fonts';
import Footer from '../components/Footer';
import { RootStackParamList } from '../types/navigation';
import { useDropdownAlert } from '../utils/notifications';
import { usePredio } from '../utils/predio';


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const HomeScreen = () => {
  // Hooks
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { notify } = useDropdownAlert();
  const [predio] = usePredio();

  // Methods
  const notSupportedYet = () => {
    notify({
      type: 'info',
      title: '¡No implementado!',
      message: 'Esta función aún no está disponible.',
    });
  };

  const openImprimirPago = () => {
    Linking.openURL(predio?.url_orden_pago);
  };

  const openPagoConTarjeta = () => {
    // Linking.openURL("https://u.mitec.com.mx/p/i/5Z4BF060");
    Linking.openURL(predio?.mit.url_movil_app);
  };

  return (
    <View style={styles.background}>

      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
      >
        <Image style={styles.elipse} source={IMAGEBACKGROUND} />

        <Header
          title={'Consulta y pago\ndel\nimpuesto predial'}
          titleStyle={{
            textAlign: 'center',
          }}
        />

        <View style={styles.content}>
          <View style={styles.menu}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('details')}
            >
              <View style={styles.menuItem}>
                <Text style={styles.txtItem}>Verificar Datos</Text>

                <Icon
                  name="ios-caret-forward-outline"
                  size={20}
                  color="#fff"
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={notSupportedYet}
            >
              <View style={styles.menuItem}>
                <Text style={styles.txtItem}>Consulta de adeudos</Text>

                <Icon
                  name="ios-caret-forward-outline"
                  size={20}
                  color="#fff"
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={openImprimirPago}
            >
              <View style={styles.menuItem}>
                <Text style={styles.txtItem}>
                  Imprimir Orden de Pago
                 </Text>

                <Icon
                  name="ios-caret-forward-outline"
                  size={20}
                  color="#fff"
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback
              onPress={openPagoConTarjeta}
            >
              <View style={styles.menuItemPago}>
                <Text style={styles.txtItem}>
                  Pagar ${predio?.ecommerce?.amount}
                </Text>

                <Icon
                  name="ios-caret-forward-outline"
                  size={20}
                  color="#fff"
                />
              </View>
            </TouchableWithoutFeedback>

            <Button
              onPress={() => navigation.reset({
                index: 0,
                routes: [{ name: 'search' }],
              })}
            >
              Consultar otra cuenta
            </Button>

            <Footer />


          </View>
        </View>
      </ScrollView>
    </View >
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  container: {
    flexGrow: 1,
  },
  elipse: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  content: {
    flexGrow: 1,
    paddingTop: 8,
  },
  menu: {
    paddingHorizontal: 20,
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
  menuItemPago: {
    flexDirection: 'row',
    backgroundColor: '#17BC46',
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
  title: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '800',
  },
  button: {
    backgroundColor: '#FF254B',
    height: 45,
    width: '100%',
    marginTop: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
