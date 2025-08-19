import FunctionVoid from '../types/FunctionVoid'
import React, { ReactElement } from 'react'
import { GAME_BUTTON_SIZE } from '../data/constants.json'
import { Image, ImageURISource, StyleSheet, TouchableOpacity } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

interface GameButtonProps {
  picture: ImageURISource,
  onPress: FunctionVoid,
}

const GameButton = ( props:GameButtonProps ): ReactElement => {
  const { picture, onPress } = props
  return (
    <TouchableOpacity style={ useVP( styles.gameButton ) } onPress={ onPress }>
      <Image source={ picture } style={ styles.picture } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  gameButton: {
    width: GAME_BUTTON_SIZE as unknown as number,
    height: GAME_BUTTON_SIZE as unknown as number,
  },
  picture: {
    width: '100%',
    height: '100%',
  },
} )

export default GameButton
