import pauseButton from '../../assets/images/pause_button.png'
import playButton from '../../assets/images/play_button.png'
import React, { ReactElement } from 'react'
import ReactSetter from '../types/ReactSetter'
import { GAME_BUTTON_SIZE } from '../data/constants.json'
import { Image, ImageURISource, StyleSheet, TouchableOpacity } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

interface PauseButtonProps {
  play: boolean,
  setPlay: ReactSetter<boolean>
}

const PauseButton = ( props:PauseButtonProps ): ReactElement => {
  const { play, setPlay } = props
  const picture: ImageURISource = play ? pauseButton : playButton 
  return (
    <TouchableOpacity style={ useVP( styles.pauseButton ) } onPress={ () => setPlay( !play ) }>
      <Image source={ picture } style={ styles.picture } />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create( {
  pauseButton: {
    width: GAME_BUTTON_SIZE as unknown as number,
    height: GAME_BUTTON_SIZE as unknown as number,
  },
  picture: {
    width: '100%',
    height: '100%',
  },
} )

export default PauseButton