import Card from './Card'
import GameButton from './GameButton'
import MovementFunction from '../types/MovementFunction'
import randomButton from '../../assets/images/random_button.png'
import React, { ReactElement } from 'react'

// Using alert
function showRandomAlert( random:MovementFunction ) {
  const callerProps = {
    text: 'Do you want to restart the game?',
    action: random,
  }
  Card.show( callerProps )
}

interface RandomButtonProps { random:MovementFunction }

// Restart the game
const RandomButton = ( props:RandomButtonProps ): ReactElement => {
  const { random } = props
  return <GameButton picture={ randomButton } onPress={ () => showRandomAlert( random ) } />
}

export default RandomButton