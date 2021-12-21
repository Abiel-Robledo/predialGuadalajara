import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import IMAGEBACKGROUND from '../../assets/imagens/Ellipse.png';
import LOGOIMAGE from '../../assets/imagens/logo.png';

const Home = () => {
  return (
    <View style={styles.background}>
      <Image style={styles.elipse} source={IMAGEBACKGROUND} />
      <View style={styles.logoContainer}>
        <Image source={LOGOIMAGE} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Consulta y pago del impuesto predial</Text>
        <View style={styles.menu}>
          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.txtItem} >Verificar Datos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.txtItem} >Consulta de adeudos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.menuItem}>
              <Text style={styles.txtItem} >Aceptación del adeudo o</Text>
              <Text style={styles.txtItem} >impresión de la orden de pago</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity >
            <View style={styles.button}>
              <Text style={styles.txtItem}>Consultar otra cuenta</Text>
            </View>
          </TouchableOpacity>


        </View>
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1A1A1A',

  },
  elipse: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoContainer: {
    backgroundColor: '#FF254B',
    width: 97,
    height: 104,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 20,
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 57,
    width: 341,
    borderRadius: 13,
    justifyContent: 'center',
    padding: 10,
    marginTop: 16,
  },
  txtItem: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff'
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '800',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FF254B',
    height: 45,
    width: 316,
    marginTop: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',

  }
})
