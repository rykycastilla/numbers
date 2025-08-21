import React, { ReactElement } from 'react'
import useAppState from '../hooks/app_state'
import useLanguage from '../hooks/language'
import { BASE_LIGHT_COLOR, FONT_SIZE, MAIN_LIGHT_COLOR, MARGIN} from '../data/styles.json'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const StartButton = (): ReactElement => {
  const { setLogged } = useAppState()
  const language = useLanguage()
  return (
    <TouchableOpacity style={ styles.button } onPress={ () => setLogged( true ) }>
      <Text style={ styles.text }>{ language.start }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  button: {
    height: '10.14vw' as unknown as number,
    marginBottom: MARGIN as unknown as number,
    borderRadius: '3vw' as unknown as number,
    backgroundColor: MAIN_LIGHT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: MARGIN as unknown as number,
    marginRight: MARGIN as unknown as number,
    color: BASE_LIGHT_COLOR,
    fontSize: FONT_SIZE * 1.05,
  },
} )

export default StartButton
