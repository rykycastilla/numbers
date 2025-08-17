import Board from '../components/Board'
import Card from '../components/Card'
import GameContainer from '../components/GameContainer'
import HeaderContainer from '../components/HeaderContainer'
import PauseButton from '../components/PauseButton'
import RandomButton from '../components/RandomButton'
import React, { ReactElement } from 'react'
import Timer from '../components/Timer'
import useAppState from '../hooks/app_state'
import useItemsManager from '../hooks/items_manager'
import useFadeAnimation from '../hooks/fade_animation'
import useProgressSaver from '../hooks/progress_saver'
import useStart from '../hooks/start'
import useUnloggedDisplacement from '../hooks/unlogged_displacement'
import View from '../components/View'
import { GAME_VIEW_DISPLACEMENT_DURATION } from '../data/constants.json'

const CardComponent = Card as unknown as ( props:{ hide:( () => void ) } ) => ReactElement

// Main view of the game
const GameView = (): ReactElement => {
  const { logged, gameRunning, setGameRunning } = useAppState()
  const style = useUnloggedDisplacement( logged, GAME_VIEW_DISPLACEMENT_DURATION )  // Login animation
  const { startFade, opacityStyle } = useFadeAnimation( 600 )  // Start animation
  // Starting game
  const [ items, go, random ] = useItemsManager()  // Getting items and its motion functions
  useStart( logged, startFade, setGameRunning )
  useProgressSaver()  // Updating storage access to the current progress
  return (
    <View style={ style }>
      <GameContainer style={ opacityStyle } >
        <HeaderContainer>
          <PauseButton play={ gameRunning } setPlay={ setGameRunning } />
          <RandomButton random={ random } />
        </HeaderContainer>
        <Board play={ gameRunning } items={ items } go={ go } random={ random } />
        <Timer count={ gameRunning } />
        <CardComponent hide={ Card.hide } />
      </GameContainer>
    </View>
  )
}

export default GameView