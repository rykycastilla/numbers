import AnimatedBlurView from './AnimatedBlurView'
import CreateSwitchable, { HideFunction, useHiding } from 'react-component-switcher'
import FunctionVoid from '../types/FunctionVoid'
import React, { ReactElement } from 'react'
import useCardConfig from '../hooks/card_config'
import { BAR_LIGHT_COLOR, BASE_LIGHT_COLOR, BASE_DARK_COLOR, FONT_SIZE, MAIN_LIGHT_COLOR, MARGIN } from '../data/styles.json'
import { FADE_DURATION } from '../data/constants.json'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

// Executes a valid action of the card an hides the interface
function executeAndExit( hide:HideFunction, action:FunctionVoid ) {
  hide()
  setTimeout( action, FADE_DURATION )
}

interface MessageProps { text:string }

// Text of the card
const Message = ( props:MessageProps ): ReactElement => {
  const { text } = props
  return <Text style={ useVP( styles.message ) }>{ text }</Text>
}

interface ButtonProps {
  title: string,
  solid: boolean,
  action: FunctionVoid,
}

const Button = ( props:ButtonProps ): ReactElement => {
  const { title, solid, action } = props
  // Creating color scheme of the button: show text with color or background with color
  const backgroundColor: string = solid ? MAIN_LIGHT_COLOR : BASE_LIGHT_COLOR
  const color: string = solid ? BASE_LIGHT_COLOR : MAIN_LIGHT_COLOR
  const colorStyle = { backgroundColor, color }
  return (
    <TouchableOpacity style={ useVP( styles.button ) } onPress={ action }>
      <Text style={ useVP( [ styles.buttonTitle, colorStyle ] ) }>{ title }</Text>
    </TouchableOpacity>
  )
}

interface ButtonBoxProps {
  hide: HideFunction,
  action: FunctionVoid,
}

// Control buttons of the card
const ButtonBox = ( props:ButtonBoxProps ): ReactElement => {
  const { hide, action } = props
  return (
    <View style={ styles.buttonBox }>
      <Button title="Cancel" solid={ false } action={ hide }/>
      <Button title="Accept" solid={ true } action={ () => executeAndExit( hide, action ) }/>
    </View>
  )
}

interface CardProps { hide:HideFunction }

interface CardCallerProps {
  text: string,
  action: FunctionVoid,
}

// Bottom Card to display alerts and warnings
const Card = ( props:CardProps, callerProps:CardCallerProps ): ReactElement => {
  const { hide } = props
  const { text, action } = callerProps
  const hiding = useHiding()
  const opacity = useCardConfig( hiding, FADE_DURATION )
  return (
    <>
      <StatusBar backgroundColor={ BAR_LIGHT_COLOR } style="dark" />
      <AnimatedBlurView intensity={ 40 } style={ [ styles.container, { opacity } ] }>
        <View style={ useVP( styles.card ) }>
          <Message text={ text } />
          <ButtonBox hide={ hide } action={ action } />
        </View>
      </AnimatedBlurView>
    </>
  )
}

const CARD_SIZE = `( 100vw - ${ MARGIN } * 2 )`

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    width: CARD_SIZE as unknown as number,
    marginBottom: MARGIN as unknown as number,
    borderRadius: '4vw' as unknown as number,
    backgroundColor: BASE_LIGHT_COLOR,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 4,
  },
  message: {
    marginTop: MARGIN as unknown as number,
    marginLeft: MARGIN as unknown as number,
    marginRight: MARGIN as unknown as number,
    marginBottom: `${ MARGIN } * 2` as unknown as number,
    color: BASE_DARK_COLOR,
    fontFamily: 'Comfortaa',
    fontSize: FONT_SIZE as unknown as number,
  },
  button: {
    width: `( ${ CARD_SIZE } - ${ MARGIN } * 3 ) / 2` as unknown as number,
    height: `${ FONT_SIZE } * 2.15` as unknown as number,
    marginLeft: MARGIN as unknown as number,
    marginBottom: MARGIN as unknown as number,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    width: '100%',
    height: '100%',
    borderRadius: '2.5vw' as unknown as number,
    fontFamily: 'Comfortaa-Bold',
    fontSize: `${ FONT_SIZE } * 1.05` as unknown as number,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
  },
} )

export default CreateSwitchable( Card, FADE_DURATION )