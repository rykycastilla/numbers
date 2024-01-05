import Item from './Item'
import itemColors from '../data/item_colors.json'
import React, { ReactElement } from 'react'
import useItemsManager from '../hooks/items_manager'
import useRequestMoveCallback from '../hooks/request_move_callback'
import { MARGIN } from '../data/styles.json'
import { StyleSheet, View } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

/*

"requestMove" is passed to every item, then the items can make a request to the board, it check if the
item can be movedand and apply the changes

*/

const ItemsList = (): ReactElement => {
  const [ items, go ] = useItemsManager( itemColors )  // Getting items and its motion function
  const requestMove = useRequestMoveCallback( items, go )  // Building movement request
  const list: ReactElement[] = []
  // Printing every item
  for( const itemData of items ) {
    const { tag, x, y, color } = itemData
    const item =
      <Item key={ tag } tag={ tag } color={ color } x={ x } y={ y } requestMove={ requestMove } />
    list.push( item )
  }
  return <>{ list }</>
}

const Board = (): ReactElement => {
  return (
    <View style={ useVP( styles.parentContainer ) }>
      <View style={ useVP( styles.childContainer ) }>
        <ItemsList />
      </View>
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
  }
} )

export default Board