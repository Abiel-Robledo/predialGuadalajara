import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { WebView } from 'react-native-webview';


const Webscreen = () => {
  return (
    <>
      <WebView
        source={{ uri: "https://pagoenlinea.guadalajara.gob.mx/impuestopredial/" }}
        style={{ flex: 1 }}
      />
    </>
  )
}

export default Webscreen

const styles = StyleSheet.create({})
