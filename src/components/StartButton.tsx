import React, { ReactElement } from 'react'
import useAppState from '../hooks/app_state'
import useLanguage from '../hooks/language'
import { BASE_LIGHT_COLOR, FONT_SIZE, MAIN_LIGHT_COLOR, MARGIN} from '../data/styles.json'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

const StartButton = (): ReactElement => {
  const { setLogged } = useAppState()
  const language = useLanguage()
  return (
    <TouchableOpacity style={ useVP( styles.button ) } onPress={ () => setLogged( true ) }>
      <Text style={ useVP( styles.text ) }>{ language.start }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  button: {
    width: '26.53vw' as unknown as number,
    height: '10.14vw' as unknown as number,
    marginBottom: MARGIN as unknown as number,
    borderRadius: '3vw' as unknown as number,
    backgroundColor: MAIN_LIGHT_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: BASE_LIGHT_COLOR,
    fontSize: `${ FONT_SIZE } * 1.05` as unknown as number,
  },
} )

export default StartButton