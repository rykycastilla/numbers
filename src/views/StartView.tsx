import AnimatedSample from '../components/AnimatedSample'
import CreateSwitchable from 'react-component-switcher'
import React, { ReactElement } from 'react'
import SafeArea from '../components/SafeArea'
import StartButton from '../components/StartButton'
import useLanguage from '../hooks/language'
import View from '../components/View'
import { BASE_DARK_COLOR, FONT_SIZE, MAIN_LIGHT_COLOR, MARGIN } from '../data/styles.json'
import { StyleSheet, Text, View as RNView } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

const WelcomeMessage = (): ReactElement => {
  const language = useLanguage()
  return (
    <Text style={ useVP( styles.welcomeMessage ) }>
      { language.welcome }<Text style={ styles.gameName }>Numbers</Text>{ language.welcomeDescription }
    </Text>
  )
}

// Say welcome (only should be showed for the first time)
const StartView = (): ReactElement => {
  return (
    <View>
      <SafeArea>
        <RNView style={ styles.view }>
          <WelcomeMessage />
          <AnimatedSample />
          <StartButton />
        </RNView>
      </SafeArea>
    </View>
  )
}

const styles = StyleSheet.create( {
  view: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeMessage: {
    marginTop: MARGIN as unknown as number,
    marginLeft: MARGIN as unknown as number,
    marginRight: MARGIN as unknown as number,
    color: BASE_DARK_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: 'Comfortaa',
  },
  gameName: {
    color: MAIN_LIGHT_COLOR,
    fontFamily: 'Comfortaa-Bold',
  },
} )

export default CreateSwitchable( StartView )