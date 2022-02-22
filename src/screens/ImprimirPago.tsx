import React, { useRef } from 'react'
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { WebView } from 'react-native-webview';
import styled from 'styled-components/native';

import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';


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

  const webview = useRef();

  const SET_WEBVIEW_FLAG = `
    if (fromWebView === undefined) {
      var fromWebView = true;
    } else {
      fromWebView = true;
    }
`;

  const HACK_ZOOM_IN = `
    setTimeout(()=>{
      fromWebView = true;
      const meta = document.createElement('meta');
      meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0');
        meta.setAttribute('name', 'viewport');
        document.getElementsByTagName('head')[0].appendChild(meta);
        let els = document.querySelectorAll('input');
        els.forEach(el => el.style='font-size:16px');
      },200);
`;

  const updateInjectedJs = () => {
    if (webview.current) {
      webview.current.injectJavaScript(HACK_ZOOM_IN);
    }
  };

  const interceptRequest = async (res) => {
    if (/data/g.test(res?.url_orden_pago)) {
      Alert.alert(
        'Estado de cuenta',
        '¿Desea descargar el PDF?',
        [
          {
            text: 'No',
            onPress: () => { },
            style: 'cancel',
          },
          {
            text: 'Sí',
            onPress: () => savePDF(res?.url_orden_pago),
          },
        ],
        { cancelable: false },
      );
    }
  };

  const savePDF = async (uri) => {
    try {
      await RNFS.writeFile(uri?.url_orden_pago, 'base64');
      await FileViewer.open(uri?.url_orden_pago);
    } catch {
      // Do something
    }
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
            ref={webview}
            source={{
              uri: predio?.url_orden_pago,
            }}
            useWebkit
            originWhitelist={['*']}
            scalesPageToFit
            style={styles.content}
            javaScriptEnabled
            mixedContentMode="compatibility"
            injectedJavaScript={HACK_ZOOM_IN}
            injectedJavaScriptBeforeContentLoaded={SET_WEBVIEW_FLAG}
            onLoad={() => updateInjectedJs()}
            onMessage={() => { }}
            onShouldStartLoadWithRequest={(predio) => interceptRequest(predio)}
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
  content: {
    flex: 1,
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
