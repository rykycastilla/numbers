import doublePopAction from '../../../assets/audio/double_pop_action.mp3'
import Item from './components/Item'
import ItemData from '../../classes/Item'
import MovementFunction from '../../types/MovementFunction'
import popAction from '../../../assets/audio/pop_action.mp3'
import React, { ReactElement } from 'react'
import useRequestMoveCallback from '../../hooks/request_move_callback'
import useSound from '../../hooks/sound'
import useWinChecking from '../../hooks/win_checking'
import { GameCanvasProvider } from '../../contexts/game_canvas'
import { GoFunction } from '../../hooks/items_manager'
import { MARGIN } from '../../data/styles.json'
import { StyleSheet, View } from 'react-native'

/*

"requestMove" is passed to every item, then the items can make a request to the board, it check if the
item can be movedand and apply the changes

*/

interface ItemsListProps {
  items: ItemData[],
  go: GoFunction,
}

const ItemsList = ( props:ItemsListProps ): ReactElement => {
  const { items, go } = props
  const playPop = useSound( popAction )
  const playDoublePop = useSound( doublePopAction )
  const useRequestMoveCallbackArgs = { items, go, playFeedback:playPop, playImpossibleFeedback:playDoublePop }
  const requestMove = useRequestMoveCallback( useRequestMoveCallbackArgs )  // Building movement request
  const list: ReactElement[] = []
  // Printing every item
  for( const itemData of items ) {
    const { tag, x, y, color } = itemData
    const item =
      <Item
        key={ tag }
        tag={ tag }
        color={ color }
        x={ x }
        y={ y }
        requestMove={ requestMove } />
    list.push( item )
  }
  return <>{ list }</>
}

interface BoardProps extends ItemsListProps {
  play: boolean,
  random: MovementFunction,
}

const Board = ( props:BoardProps ): ReactElement => {
  const { play, items, go, random } = props
  useWinChecking( items, random )  // Used to win
  return (
    <>
      <View style={ styles.childContainer }>
        <ItemsList items={ items } go={ go } />
      </View>
      { /* Is used a wall to stop interaction with the board when the game is paused */ }
      { play ? <></> : <View pointerEvents="auto" onStartShouldSetResponder={ () => true } style={ styles.pauseWall } /> }
    </>
  )
}

type GameBoardProps = BoardProps

const GameBoard = ( props:GameBoardProps ): ReactElement => {
  return (
    <GameCanvasProvider width="100%">
      <Board { ...props } />
    </GameCanvasProvider>
  )
}

const styles = StyleSheet.create( {
  childContainer: {
    margin: MARGIN,
    flex: 1,
  },
  pauseWall: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba( 0, 0, 0, 0 )',
  },
} )

export default GameBoard
