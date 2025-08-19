import Card from './Card'
import GameButton from './GameButton'
import Language from '../types/Language'
import MovementFunction from '../types/MovementFunction'
import randomButton from '../../assets/images/random_button.png'
import React, { ReactElement } from 'react'
import useLanguage from '../hooks/language'

// Using alert
function showRandomAlert( random:MovementFunction, language:Language ) {
  const callerProps = {
    text: language.restartWarning,
    action: random,
  }
  Card.show( callerProps )
}

interface RandomButtonProps { random:MovementFunction }

// Restart the game
const RandomButton = ( props:RandomButtonProps ): ReactElement => {
  const { random } = props
  const language = useLanguage()
  return <GameButton picture={ randomButton } onPress={ () => showRandomAlert( random, language ) } />
}

export default RandomButton
