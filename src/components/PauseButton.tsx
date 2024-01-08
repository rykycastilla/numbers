import GameButton from './GameButton'
import pauseButton from '../../assets/images/pause_button.png'
import playButton from '../../assets/images/play_button.png'
import React, { ReactElement } from 'react'
import ReactSetter from '../types/ReactSetter'
import { ImageURISource } from 'react-native'

interface PauseButtonProps {
  play: boolean,
  setPlay: ReactSetter<boolean>
}

const PauseButton = ( props:PauseButtonProps ): ReactElement => {
  const { play, setPlay } = props
  const picture: ImageURISource = play ? pauseButton : playButton 
  return <GameButton picture={ picture } onPress={ () => setPlay( !play ) } />
}

export default PauseButton