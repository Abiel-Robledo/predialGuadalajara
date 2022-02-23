import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import IMAGEBACKGROUND from '../../assets/images/Ellipse.png';

import Header from '../components/Header';
import Button from '../components/Button';
import fonts from '../utils/fonts';
import Footer from '../components/Footer';
import { consultaBancos } from '../services/apipagoenlinea';

import { RootStackParamList } from '../types/navigation';
import { useDropdownAlert } from '../utils/notifications';
import { usePredio } from '../utils/predio';
import { numberFormat } from '../utils/numbers';
import colors from '../utils/colors';



type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const HomeScreen = () => {
  // Hooks
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { notify } = useDropdownAlert();
  const [predio] = usePredio();

  const [recaudadora, setRecaudadora] = useState<string>('');
  const [tipo, setTipo] = useState<string>('');
  const [cuenta, setCuenta] = useState<string>('');
  const [correo, setCorreo] = useState<string>('');

  // Methods
  const notSupportedYet = () => {
    notify({
      type: 'warn',
      title: '¡EN MANTENIMIENTO!',
      message: 'Esta función se encuentra en mantenimiento',
    });
  };

  // const navegateToPago = () => {
  //   navigation.dispatch(CommonActions.reset({
  //     index: 1,
  //     routes: [
  //       {
  //         name: 'search',
  //       },
  //       {
  //         name: 'pago',
  //       }
  //     ]
  //   }));
  // };

  const navegateToPago = () => {
    navigation.navigate('pago')
  };

  const navegateToImprimirPago = () => {
    if (Platform.OS === 'ios') {
      navigation.navigate('imprimirPagoIOS')
    }
    if (Platform.OS === 'android') {
      navigation.navigate('imprimirPago')
    }
  };

  const onSubmit = async () => {
    const response = await consultaBancos(
      '174',
      predio?.bbva.s_transm,
      predio?.bbva.r_bancaria,
      predio?.bbva.t_importe,
      predio?.icebl,
    );

    if (predio?.mit?.url_movil_app === undefined) {
      notSupportedYet();
    } else {
      if (response.status) {
        notify({
          type: 'success',
          title: 'EXITOSO',
          message: response.message,
        });
      } else {
        notify({
          type: 'warn',
          title: 'AVISO!',
          message: response?.message || 'Hubo un error',
        });
      }
      navegateToPago();
    };
  };

  const PROPERTIES: Prop[] = [
    {
      fieldName: 'Valor Construcción',
      propertie: 'amount',
      render: (val) => numberFormat(val as string),
    },
  ];

  return (

    <KeyboardAwareScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      bounces={false}
      keyboardShouldPersistTaps="always"
    >

      <View style={styles.background}>

        <ScrollView
          contentContainerStyle={styles.container}
          bounces={false}
        >

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
                    color={colors.secundary}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => (navigation.navigate('detalleDePago'))}
              >
                <View style={styles.menuItem}>
                  <Text style={styles.txtItem}>Consulta de adeudos</Text>

                  <Icon
                    name="ios-caret-forward-outline"
                    size={20}
                    color={colors.secundary}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => (navegateToImprimirPago())}
              >
                <View style={styles.menuItem}>
                  <Text style={styles.txtItem}>
                    Imprimir Orden de Pago
                 </Text>

                  <Icon
                    name="ios-caret-forward-outline"
                    size={20}
                    color={colors.secundary}
                  />
                </View>
              </TouchableWithoutFeedback>

              {
                PROPERTIES.map((

                  {
                    fieldName,
                    propertie,
                    render = (val) => val || '$0.00',
                  },
                  index,
                ) => (
                    <TouchableWithoutFeedback
                      // onPress={predio?.mit?.url_movil_app === undefined ? notSupportedYet : navegateToPago}
                      onPress={onSubmit}
                    >
                      <View style={styles.menuItem}>
                        <Text style={styles.menuItemPago}>
                          Pagar {render(predio?.ecommerce?.amount || "0") as string}
                        </Text>

                        <Icon
                          name="ios-caret-forward-outline"
                          size={20}
                          color={colors.secundary}
                        />
                      </View>
                    </TouchableWithoutFeedback>

                  ))
              }

              <Button
                onPress={() => navigation.reset({
                  index: 0,
                  routes: [{ name: 'search' }],
                })}
              >
                Consultar otra cuenta
            </Button>

              <Footer />

              <Header
                title={'Consulta y pago\ndel\nimpuesto predial'}
                titleStyle={{
                  textAlign: 'center',
                }}
              />


            </View>
          </View>
        </ScrollView>
      </View >

    </KeyboardAwareScrollView>

  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
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
    backgroundColor: colors.text,
    minHeight: 57,
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 17,
    marginTop: 16,
  },
  menuItemPago: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: '#17BC46',
    flex: 1,
  },
  txtItem: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: colors.secundary,
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
