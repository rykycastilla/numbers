import FunctionVoid from '../types/FunctionVoid'
import React, { ReactElement } from 'react'
import { GAME_BUTTON_SIZE } from '../data/constants.json'
import { MARGIN } from '../data/styles.json'
import { Image, ImageURISource, StyleSheet, TouchableOpacity } from 'react-native'

interface GameButtonProps {
  picture: ImageURISource,
  onPress: FunctionVoid,
}

const GameButton = ( props:GameButtonProps ): ReactElement => {
  const { picture, onPress } = props
  return (
    <TouchableOpacity style={ styles.gameButton } onPress={ onPress }>
      <Image source={ picture } style={ styles.picture } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  gameButton: {
    width: GAME_BUTTON_SIZE,
    height: GAME_BUTTON_SIZE,
    margin: MARGIN,
  },
  picture: {
    width: '100%',
    height: '100%',
  },
} )

export default GameButton
