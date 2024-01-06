import Board from '../components/Board'
import GameContainer from '../components/GameContainer'
import Opacity from '../enums/Opacity'
import React, { ReactElement, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import useAppState from '../hooks/app_state'
import useFadeAnimation from '../hooks/fade_animation'
import useUnloggedDisplacement from '../hooks/unlogged_displacement'
import View from '../components/View'
import { GAME_VIEW_DISPLACEMENT_DURATION } from '../data/constants.json'

// Main view of the game
const GameView = (): ReactElement => {
  const { logged } = useAppState()
  const [ gameRunning, setGameRunning ] = useState( false )
  const style = useUnloggedDisplacement( logged, GAME_VIEW_DISPLACEMENT_DURATION )  // Login animation
  const { startFade, opacityStyle } = useFadeAnimation( 600 )  // Start animation
  // Starting game
  useEffect( () => {
    if( !logged ) { return }
    setTimeout( () => {
      startFade( Opacity.SHOW )  // Using start animation
      setGameRunning( true )
    }, GAME_VIEW_DISPLACEMENT_DURATION )  // Waiting the login animation end to start the game
  }, [ logged ] )
  return (
    <View style={ style }>
      <GameContainer style={ opacityStyle } >
        <Board />
        <Timer count={ gameRunning } />
      </GameContainer>
    </View>
  )
}

export default GameView