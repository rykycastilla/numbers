import Board from '../components/Board'
import Card from '../components/Card'
import GameContainer from '../components/GameContainer'
import HeaderContainer from '../components/HeaderContainer'
import itemColors from '../data/item_colors.json'
import PauseButton from '../components/PauseButton'
import RandomButton from '../components/RandomButton'
import React, { ReactElement, useState } from 'react'
import Timer from '../components/Timer'
import useAppState from '../hooks/app_state'
import useItemsManager from '../hooks/items_manager'
import useFadeAnimation from '../hooks/fade_animation'
import useStart from '../hooks/start'
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
  const [ items, go, random ] = useItemsManager( itemColors )  // Getting items and its motion functions
  useStart( logged, startFade, setGameRunning )
  return (
    <View style={ style }>
      <GameContainer style={ opacityStyle } >
        <HeaderContainer>
          <PauseButton play={ gameRunning } setPlay={ setGameRunning } />
          <RandomButton random={ random } />
        </HeaderContainer>
        <Board play={ gameRunning } items={ items } go={ go } />
        <Timer count={ gameRunning } />
        <Card hide={ Card.hide } />
      </GameContainer>
    </View>
  )
}

export default GameView