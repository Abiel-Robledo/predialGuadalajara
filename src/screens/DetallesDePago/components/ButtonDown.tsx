import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import fonts from '../../../utils/fonts';
import colors from '../../../utils/colors';
import { AdeudoProps } from '../../../types/api'
import { numberFormat } from '../../../utils/numbers';


interface ButtonDownProps {
  item?: AdeudoProps;
}

const ButtonDown: React.FC<ButtonDownProps> = ({ item }) => {

  const [visible, setVisible] = useState(false);
  const toggle = () => setVisible(!visible);

  const PROPERTIES: Prop[] = [
    {
      render: (val) => numberFormat(val as string),
    },
  ];

  return (
    <>
      {
        PROPERTIES.map((
          {
            render = (val) => val || '$0.00',
          },
        ) => (
            <TouchableOpacity disabled={item?.TITULO === 'Multas' && true} onPress={toggle}>
              <View style={styles.menuItem}>
                <Text style={styles.txtItem}>{item?.TITULO} {item?.AXO}</Text>
                <Text style={styles.txtItemMoney}>{render(item?.TOTAL || "0") as string}</Text>
                {item?.TITULO !== 'Multas' && (
                  <Icon
                    name="ios-caret-down-outline"
                    size={24}
                    color={colors.secundary}
                    style={{
                      marginRight: 10,
                    }}
                  />

                )}
              </View>
            </TouchableOpacity>
          ))
      }

      {
        visible && PROPERTIES.map((
          {
            render = (val) => val || '$0.00',
          },
        ) => (
            <View style={styles.list}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Año:</Text>
                <Text style={styles.textData}>{item?.AXO || '--'}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Bimestre:</Text>
                <Text style={styles.textData}>{item?.BIMESTRE || '--'}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Valor Fiscal:</Text>
                <Text style={styles.textData}>{item?.VALFISCAL || '--'}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Tasa:</Text>
                <Text style={styles.textData}>{item?.TASA || '--'}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Impuesto Predial:</Text>
                <Text style={styles.textData}>{render(item?.IMPUESTO || "0") as string}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Recargos:</Text>
                <Text style={styles.textData}>{render(item?.RECARGOS || "0") as string}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Actualizacion:</Text>
                <Text style={styles.textData}>{render(item?.ACTUALIZACION || "0") as string}</Text>
              </View>

              <View style={styles.line} />
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Total:</Text>
                <Text style={styles.textData}>{render(item?.TOTAL || "0") as string}</Text>
              </View>

            </View>
          ))
      }

    </>
  )
}

export default ButtonDown

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
  line: {
    height: 1,
    width: '100%',
    backgroundColor: colors.text,
    marginTop: 10,
    marginBottom: 10,
  },
  txtItem: {
    fontSize: 18,
    fontFamily: fonts.extraBold,
    color: colors.secundary,
    flex: 1,
  },
  txtItemMoney: {
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.secundary,
    marginRight: 5,
  },
  list: {
    width: '100%',
    height: 270,
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
