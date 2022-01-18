import React, { useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../../../utils/colors'
import fonts from '../../../utils/fonts'

import { usePredio } from '../../../utils/predio';
import { numberFormat } from '../../../utils/numbers';



const Footer = () => {
  const [predio] = usePredio();

  const totalPredio: string | number = useMemo(() => {
    if (predio?.adeudos && Array.isArray(predio.adeudos)) {
      const obj = predio.adeudos.find(x => x.IDENTIFICADOR === 'TOTAL');

      if (obj) {
        return obj.TOTAL;
      }
    }

    return 0;
  }, [predio]);

  const totalDescPredio: string | number = useMemo(() => {
    if (predio?.adeudos && Array.isArray(predio.adeudos)) {
      const obj = predio.adeudos.find(x => x.IDENTIFICADOR === 'TOTDESCTO');

      if (obj) {
        return obj.TOTAL;
      }
    }

    return 0;
  }, [predio]);

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
            <View style={styles.footer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Total:</Text>
                <Text style={styles.textData}>{render(totalPredio || "0") as string}</Text>
              </View>


              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>Descuentos:</Text>
                <Text style={styles.textData}>${totalDescPredio || '0'}</Text>
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>A Pagar:</Text>
                <Text style={styles.textData}>{render(predio?.ecommerce?.amount || "0") as string}</Text>
              </View>
            </View>
          ))
      }

    </>

  )
}

export default Footer

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.secundary,
    height: 150,
    padding: 20,
    borderTopEndRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.text,
  },
  text: {
    marginVertical: 5,
    fontSize: 18,
    fontFamily: fonts.bold,
    color: colors.text,
    flex: 1,
  },
  textData: {
    flex: 1,
    marginVertical: 5,
    fontSize: 18,
    fontFamily: fonts.regular,
    color: colors.text,
  }

})
