import AnimatedBlurView from './AnimatedBlurView'
import CardButtonType from '../enums/CardButtonType'
import CreateSwitchable, { HideFunction, useHiding } from 'react-component-switcher'
import FunctionVoid from '../types/FunctionVoid'
import React, { ReactElement } from 'react'
import useBackButton from '../hooks/back_button'
import useCardConfig from '../hooks/card_config'
import useLanguage from '../hooks/language'
import { BASE_LIGHT_COLOR, BASE_DARK_COLOR, FONT_SIZE, MAIN_LIGHT_COLOR, MARGIN } from '../data/styles.json'
import { FADE_DURATION } from '../data/constants.json'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

// Executes a valid action of the card an hides the interface
function executeAndExit( hide:HideFunction, action:FunctionVoid ) {
  hide()
  setTimeout( action, FADE_DURATION )
}

interface MessageProps {
  text:string
  importantText?: string,
}

// Text of the card
const Message = ( props:MessageProps ): ReactElement => {  // eslint-disable-line
  const { text, importantText } = props
  // Using it if the card have important text
  const itIsImportant: boolean = typeof importantText === 'string'
  return (
    <Text style={ useVP( styles.message ) }>
      { text }
      { itIsImportant && '\n\n' }
      {
        itIsImportant &&
          <Text
            // eslint-disable-next-line
            style={ useVP( styles.importantMessage ) }>
            { importantText }
          </Text>
      }
    </Text>
  )
}

interface ButtonProps {
  title: string,
  solid: boolean,
  action: FunctionVoid,
  size: CardButtonType,
}

const Button = ( props:ButtonProps ): ReactElement => {  // eslint-disable-line
  const { title, solid, action, size } = props
  // Creating color scheme of the button: show text with color or background with color
  const backgroundColor: string = solid ? MAIN_LIGHT_COLOR : BASE_LIGHT_COLOR
  const color: string = solid ? BASE_LIGHT_COLOR : MAIN_LIGHT_COLOR
  const colorStyle = { backgroundColor, color }
  // Setting button size (based on its type)
  let sizeStyle = {}
  if( size === CardButtonType.MIDDLE ) { sizeStyle = styles.middleButtonWidth }
  else if( size === CardButtonType.FULL ) { sizeStyle = styles.fullButtonWidth }
  return (
    <TouchableOpacity style={ useVP( [ styles.button, sizeStyle ] ) } onPress={ action }>
      <Text style={ useVP( [ styles.buttonTitle, colorStyle ] ) }>{ title }</Text>
    </TouchableOpacity>
  )
}

interface ButtonBoxProps {
  hide: HideFunction,
  action: FunctionVoid,
  isAlert?: boolean,
}

// Control buttons of the card
const ButtonBox = ( props:ButtonBoxProps ): ReactElement => {  // eslint-disable-line
  const { hide, action, isAlert } = props
  const acceptButtonSize: CardButtonType = isAlert ? CardButtonType.FULL : CardButtonType.MIDDLE
  const language = useLanguage()
  return (
    <View style={ styles.buttonBox }>
      { /* Only show "Cancel Button" if it is not an alert card */ }
      { isAlert ? <></> : <Button title={ language.cancel } solid={ false } action={ hide } size={ CardButtonType.MIDDLE } /> }
      <Button title={ language.accept } solid={ true } size={ acceptButtonSize } action={ () => executeAndExit( hide, action ) } />
    </View>
  )
}

interface CardProps { hide:HideFunction }

interface CardCallerProps {
  text: string,
  importantText?: string,
  action: FunctionVoid,
  isAlert?: boolean,
}

// Bottom Card to display alerts and warnings
const Card = ( props:CardProps, callerProps:CardCallerProps ): ReactElement => {  // eslint-disable-line
  const { hide } = props
  const { text, importantText, action, isAlert } = callerProps
  const hiding = useHiding()
  const opacity = useCardConfig( hiding, FADE_DURATION )
  // Handling Back Press
  useBackButton( () => {
    if( isAlert ) { executeAndExit( hide, action ) }
    else { hide() }
  } )
  return (
    <>
      <StatusBar style="dark" />
      <AnimatedBlurView intensity={ 40 } style={ [ styles.container, { opacity } ] }>
        <View style={ useVP( styles.card ) }>
          <Message text={ text } importantText={ importantText } />
          <ButtonBox hide={ hide } action={ action } isAlert={ isAlert } />
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
    fontSize: FONT_SIZE,
  },
  importantMessage: {
    color: MAIN_LIGHT_COLOR,
    fontFamily: 'Comfortaa-Bold',
  },
  button: {
    height: `${ FONT_SIZE } * 2.15` as unknown as number,
    marginLeft: MARGIN as unknown as number,
    marginBottom: MARGIN as unknown as number,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButtonWidth: { width: `( ${ CARD_SIZE } - ${ MARGIN } * 3 ) / 2` as unknown as number },
  fullButtonWidth: { width: `${ CARD_SIZE } - ${ MARGIN } * 2` as unknown as number },
  buttonTitle: {
    width: '100%',
    height: '100%',
    borderRadius: '2.5vw' as unknown as number,
    fontFamily: 'Comfortaa-Bold',
    fontSize: FONT_SIZE * 1.05,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
  },
} )

export default CreateSwitchable( Card, FADE_DURATION )  // eslint-disable-line
