import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


import { RootStackParamList } from '../../types/navigation';

import Header from '../Details/components/Header';
import colors from '../../utils/colors';
import Title from './components/Title';
import Footer from './components/Footer';
import ButtonDown from './components/ButtonDown';

import fonts from '../../utils/fonts';
import { usePredio } from '../../utils/predio';
import { PredioProps } from '../../types/api';
import { numberFormat } from '../../utils/numbers';


type datalledePagoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'detalleDePago'>;

const DetallesDePago = () => {
  const navigation = useNavigation<datalledePagoNavigationProp>();

  const [predio] = usePredio();

  return (
    <View style={styles.background}>
      <Header
        onPress={() => navigation.goBack()}
      />

      <Title />

      <ScrollView
        contentContainerStyle={styles.container}
        bounces={false}
      >
        {/* <TouchableOpacity onPress={toggle}>
          <ButtonDown axo="2021" total="3,000" valor={visible} />
        </TouchableOpacity> */}

        <FlatList
          showsVerticalScrollIndicator={false}
          data={predio?.adeudos.filter((x) => !['TOTAL', 'DESCTORECG', 'DESCTOIMPU', 'TOTDESCTO', 'TOTAPAGAR'].includes(x.IDENTIFICADOR))}
          renderItem={({ item }) => (
            <ButtonDown item={item} />
          )}
        />
      </ScrollView>

      <Footer />

    </View>
  )
}

export default DetallesDePago

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
})
