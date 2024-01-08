import AnimatedInterpolation from '../types/AnimatedInterpolation'
import useItemSize from './item_size'
import { Animated } from 'react-native'
import { GAME_VIEW_DISPLACEMENT_DURATION } from '../data/constants.json'
import { useEffect, useRef } from 'react'

// Calculates position on the board for an specific axis (showing an animation between changes)
function useAnimatedPosition( position:number ): AnimatedInterpolation {
  // Setting animation parameters
  const toValue: number = position,
    duration: number = GAME_VIEW_DISPLACEMENT_DURATION,
    useNativeDriver = false
  // Building animation values
  const animValue = new Animated.Value( 0 )
  const animRef = useRef( animValue ).current
  const cell = useItemSize()  // Calculating the cell size
  // Running animation
  useEffect( () => {
    const animation = Animated.timing( animRef, { toValue, duration, useNativeDriver } )
    animation.start()
  }, [ position ] )
  // Parsing animation values
  const boardPosition: AnimatedInterpolation = animRef.interpolate( {
    inputRange: [ 0, 1, 2, 3 ],
    outputRange: [ 0, cell, cell*2, cell*3 ],
  } )
  return boardPosition
}

export default useAnimatedPosition