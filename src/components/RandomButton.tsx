import GameButton from './GameButton'
import MovementFunction from '../types/MovementFunction'
import randomButton from '../../assets/images/random_button.png'
import React, { ReactElement } from 'react'

interface RandomButtonProps { random:MovementFunction }

const RandomButton = ( props:RandomButtonProps ): ReactElement => {
  const { random } = props
  return <GameButton picture={ randomButton } onPress={ random } />
}

export default RandomButton