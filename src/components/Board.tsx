import CellCount from '../types/CellCount'
import Item from './Item'
import itemColors from '../data/item_colors.json'
import React, { ReactElement } from 'react'
import resolveAsMatrix from '../functions/resolve_as_matrix'
import { BOARD_GRID_SIZE } from '../data/constants.json'
import { MARGIN } from '../data/styles.json'
import { StyleSheet, View } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

const ItemsList = (): ReactElement => {
  const list: ReactElement[] = []
  // Printing every item
  for( let _this = 0; _this < itemColors.length; _this++ ) {
    const color: string = itemColors[ _this ],
      tag: number = _this + 1
    const { x, y } = resolveAsMatrix( _this, BOARD_GRID_SIZE )  // calculating coordinates
    const item = <Item tag={ tag } color={ color } x={ x as CellCount } y={ y as CellCount } />
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