import CellCount from '../types/CellCount'
import React, { ReactElement } from 'react'
import useAxisPosition from '../hooks/axis_position'
import { Animated, Pressable, StyleSheet, Text } from 'react-native'
import { BASE_LIGHT_COLOR, FONT_SIZE } from '../data/styles.json'
import { ITEM_SIZE } from '../data/constants.json'
import { useVP } from 'react-native-viewport-provider'

interface ItemProps {
  tag: number,
  color: string,
  x: CellCount,
  y: CellCount,
}

// Items of the game board
const Item = ( props:ItemProps ): ReactElement => {
  const { tag, color:backgroundColor, x, y } = props
  const top = useAxisPosition( y )
  const left = useAxisPosition( x )
  const position = { top, left }
  return (
    <Animated.View style={ useVP( [ styles.item, { backgroundColor }, position ] ) }>
      <Pressable style={ styles.touchableArea }>
        <Text style={ useVP( styles.tag ) }>{ tag }</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  item: {
    width: ITEM_SIZE as unknown as number,
    height: ITEM_SIZE as unknown as number,
    position: 'absolute',
    borderRadius: '5vw' as unknown as number,
  },
  touchableArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItem: 'center',
  },
  tag: {
    color: BASE_LIGHT_COLOR,
    fontSize: `${ FONT_SIZE } * 1.53` as unknown as number,
    fontFamily: 'Comfortaa-Bold',
    textAlign: 'center',
  },
} )

export default Item