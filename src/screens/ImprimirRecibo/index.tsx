import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';


import { RootStackParamList } from '../../types/navigation';

import Header from '../Details/components/Header';
import colors from '../../utils/colors';
import Title from './components/Title';
import ButtonList from './components/ButtonList';

import fonts from '../../utils/fonts';
import { usePredio } from '../../utils/predio';
import { PredioProps } from '../../types/api';
import { numberFormat } from '../../utils/numbers';

const pago = [1, 2, 3, 4]
type ImprimirReciboNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ImprimirRecibo'>;

const DetallesDePago = () => {
  const navigation = useNavigation<ImprimirReciboNavigationProp>();

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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={predio?.pagos}
          renderItem={({ item }) => (
            <ButtonList item={item} />
          )}
        />
      </ScrollView>

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
