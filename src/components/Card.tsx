import AnimatedBlurView from './AnimatedBlurView'
import CreateSwitchable, { HideFunction, useHiding } from 'react-component-switcher'
import FunctionVoid from '../types/FunctionVoid'
import React, { ReactElement } from 'react'
import SafeArea from '../components/SafeArea'
import useBackButton from '../hooks/back_button'
import useCardConfig from '../hooks/card_config'
import useLanguage from '../hooks/language'
import { BASE_LIGHT_COLOR, BASE_DARK_COLOR, FONT_SIZE, MAIN_LIGHT_COLOR, MARGIN } from '../data/styles.json'
import { FADE_DURATION } from '../data/constants.json'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

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
    <Text style={ styles.message }>
      { text }
      { itIsImportant && '\n\n' }
      { itIsImportant && <Text style={ styles.importantMessage }>{ importantText }</Text> }
    </Text>
  )
}

interface ButtonProps {
  title: string,
  solid: boolean,
  action: FunctionVoid,
}

const Button = ( props:ButtonProps ): ReactElement => {  // eslint-disable-line
  const { title, solid, action } = props
  // Creating color scheme of the button: show text with color or background with color
  const backgroundColor: string | undefined = solid ? MAIN_LIGHT_COLOR : undefined
  const color: string = solid ? BASE_LIGHT_COLOR : MAIN_LIGHT_COLOR
  const colorStyle = { backgroundColor, color }
  return (
    <TouchableOpacity style={ styles.button } onPress={ action }>
      <Text style={ [ styles.buttonTitle, colorStyle ] }>{ title }</Text>
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
  const language = useLanguage()
  return (
    <View style={ styles.buttonBox }>
      { /* Only show "Cancel Button" if it is not an alert card */ }
      { isAlert ? <></> : <Button title={ language.cancel } solid={ false } action={ hide } /> }
      <Button title={ language.accept } solid={ true } action={ () => executeAndExit( hide, action ) } />
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
      <AnimatedBlurView intensity={ 40 } style={ [ styles.blur, { opacity } ] }>
        <SafeArea>
          <View style={ styles.container }>
            <View style={ styles.card }>
              <Message text={ text } importantText={ importantText } />
              <ButtonBox hide={ hide } action={ action } isAlert={ isAlert } />
            </View>
          </View>
        </SafeArea>
      </AnimatedBlurView>
    </>
  )
}

const styles = StyleSheet.create( {
  blur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba( 0, 0, 0, 0.5 )',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    left: MARGIN,
    right: MARGIN,
    bottom: MARGIN,
    borderRadius: 15,
    backgroundColor: BASE_LIGHT_COLOR,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    elevation: 4,
  },
  message: {
    marginTop: MARGIN,
    marginLeft: MARGIN,
    marginRight: MARGIN,
    marginBottom: MARGIN * 2,
    color: BASE_DARK_COLOR,
    textAlign: 'center',
    fontFamily: 'Comfortaa',
    fontSize: FONT_SIZE,
  },
  importantMessage: {
    color: MAIN_LIGHT_COLOR,
    fontFamily: 'Comfortaa-Bold',
  },
  button: {
    height: FONT_SIZE * 2.15,
    minWidth: 0,
    marginBottom: MARGIN,
    marginHorizontal: MARGIN / 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleButtonWidth: {
    flex: 1,
  },
  fullButtonWidth: {
    flex: 1,
  },
  buttonTitle: {
    width: '100%',
    height: '100%',
    borderRadius: 7.5,
    fontFamily: 'Comfortaa-Bold',
    fontSize: FONT_SIZE * 1.05,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonBox: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: MARGIN / 2,
  },
} )

export default CreateSwitchable( Card, FADE_DURATION )  // eslint-disable-line
