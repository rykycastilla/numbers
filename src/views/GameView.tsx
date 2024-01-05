import Board from '../components/Board'
import GameContainer from '../components/GameContainer'
import React, { ReactElement } from 'react'
import useAppState from '../hooks/app_state'
import useUnloggedDisplacement from '../hooks/unlogged_displacement'
import View from '../components/View'

// Main view of the game
const GameView = (): ReactElement => {
  const { logged } = useAppState()
  const style = useUnloggedDisplacement( logged )
  return (
    <View style={ style }>
      <GameContainer >
        <Board />
      </GameContainer>
    </View>
  )
}

export default GameView