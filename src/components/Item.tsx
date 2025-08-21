import React, { ReactElement } from 'react'
import useAnimatedPosition from '../hooks/animated_position'
import useShake from '../hooks/shake'
import { Animated, Pressable, StyleSheet, Text } from 'react-native'
import { BASE_LIGHT_COLOR, FONT_SIZE } from '../data/styles.json'
import { ITEM_SIZE } from '../data/constants.json'
import { RequestMoveCallback } from '../hooks/request_move_callback'

interface ItemProps {
  tag: number,
  color: string,
  x: number,
  y: number,
  requestMove: RequestMoveCallback,
}

// Items of the game board
const Item = ( props:ItemProps ): ReactElement => {
  const { tag, color:backgroundColor, x, y, requestMove } = props
  // Calculating position
  const translateX = useAnimatedPosition( x )
  const translateY = useAnimatedPosition( y )
  // Using Shake as Impossible Feedback
  const { shake, translate } = useShake()
  const shakePosition = { translateX: translate },
    transform = [ { translateX }, { translateY }, shakePosition ],
    position = { transform }
  return (
    <Animated.View style={ [ styles.item, { backgroundColor }, position as any ] }>
      <Pressable style={ styles.touchableArea } onPress={ () => requestMove( tag, shake ) }>
        <Text style={ styles.tag }>{ tag }</Text>
      </Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  item: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    position: 'absolute',
    borderRadius: 15,
  },
  touchableArea: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tag: {
    color: BASE_LIGHT_COLOR,
    fontSize: FONT_SIZE * 1.53,
    fontFamily: 'Comfortaa-Bold',
    textAlign: 'center',
  },
} )

export default Item
