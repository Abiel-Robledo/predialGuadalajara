import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../utils/colors';
import fonts from '../../../utils/fonts';
import { useNavigation, CommonActions } from '@react-navigation/native';


import { numberFormat } from '../../../utils/numbers';

const ButtonList = ({ item }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  const navegateToImprimirRecibo = () => {
    if (Platform.OS === 'ios') {
      navigation.navigate('reciboPDFIOS')
    }
    if (Platform.OS === 'android') {
      navigation.navigate('reciboPDF')
    }
  };

  const navegateToImprimirReciboSalvoBuenDia = () => {
    if (Platform.OS === 'ios') {
      navigation.navigate('reciboBuenCobroIOS')
    }
    if (Platform.OS === 'android') {
      navigation.navigate('reciboBuenCobro')
    }
  };

  const PROPERTIES: Prop[] = [
    {
      render: (val) => numberFormat(val as string),
    },
  ];

  return (
    <View>
      {
        PROPERTIES.map((
          {
            render = (val) => val || '$0.00',
          },
        ) => (
            <TouchableWithoutFeedback
              onPress={toggle}
            >
              <View style={styles.menuItem}>
                <View style={styles.infoButton}>
                  <Text style={styles.txtItem}>
                    {item?.year_pago}
                  </Text>

                  <Text style={styles.txtItem}>
                    {item?.estatus}
                  </Text>
                </View>

                <Text style={styles.txtItem}>{render(item?.monto || "0") as string}</Text>

                <Icon
                  name="ios-caret-down-outline"
                  size={24}
                  color={colors.secundary}
                  style={{
                    marginRight: 10,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          ))
      }

      {
        visible && PROPERTIES.map((
          {
            render = (val) => val || '$0.00',
          },
        ) => (
            <View style={styles.list}>
              <TouchableWithoutFeedback
                onPress={() => navegateToImprimirRecibo()}
              >
                <View style={styles.menuItemDown}>
                  <View style={styles.infoButton}>
                    <Text style={styles.txtItem}>
                      Imprimir Recibo
                    </Text>
                  </View>

                  <Icon
                    name="ios-caret-forward-outline"
                    size={24}
                    color={colors.secundary}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => navegateToImprimirReciboSalvoBuenDia()}
              >
                <View style={styles.menuItemDown}>
                  <View style={styles.infoButton}>
                    <Text style={styles.txtItem}>
                      Imprimir Recibo Salvo Buen Cobro
                    </Text>
                  </View>

                  <Icon
                    name="ios-caret-forward-outline"
                    size={24}
                    color={colors.secundary}
                    style={{
                      marginRight: 10,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))
      }
    </View>
  )
}

export default ButtonList

const styles = StyleSheet.create({
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
  menuItemDown: {
    flexDirection: 'row',
    backgroundColor: colors.text,
    minHeight: 57,
    width: '100%',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 17,
    marginTop: 5,
  },
  infoButton: {
    flexDirection: 'row',
    flex: 1,
  },
  txtItem: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: colors.secundary,
    marginHorizontal: 10,
  },
  list: {
    width: '100%',
    height: 170,
    padding: 20,
  },
  text: {
    marginVertical: 3,
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.text,
    flex: 1,
  },
  textData: {
    flex: 1,
    marginVertical: 3,
    marginLeft: 5,
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
  }
})
