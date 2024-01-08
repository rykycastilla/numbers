import Item from './Item'
import ItemData from '../classes/Item'
import React, { ReactElement } from 'react'
import useRequestMoveCallback from '../hooks/request_move_callback'
import { GoFunction } from '../hooks/items_manager'
import { MARGIN } from '../data/styles.json'
import { StyleSheet, View } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

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
  const requestMove = useRequestMoveCallback( items, go )  // Building movement request
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

interface BoardProps extends ItemsListProps { play:boolean }

const Board = ( props:BoardProps ): ReactElement => {
  const { play, items, go } = props
  return (
    <View style={ useVP( styles.parentContainer ) }>
      <View style={ useVP( styles.childContainer ) }>
        <ItemsList items={ items } go={ go } />
      </View>
      { /* Is used a wall to stop interaction with the board when the game is paused */ }
      { play ? <></> : <View style={ styles.pauseWall } /> }
    </View>
  )
}
const PARENT_CONTAINER_SIZE = '100vw',
  CHILD_CONTAINER_SIZE = `${ PARENT_CONTAINER_SIZE } - ${ MARGIN } * 2`

const styles = StyleSheet.create( {
  parentContainer: {
    width: '100vw' as unknown as number,
    height: '100vw' as unknown as number,
  },
  childContainer: {
    width: CHILD_CONTAINER_SIZE as unknown as number,
    height: CHILD_CONTAINER_SIZE as unknown as number,
    marginTop: MARGIN as unknown as number,
    marginLeft: MARGIN as unknown as number,
  },
  pauseWall: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba( 0, 0, 0, 0 )',
  },
} )

export default Board