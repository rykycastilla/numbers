import Opacity from '../enums/Opacity'
import { Animated } from 'react-native'
import { useEffect, useRef } from 'react'

// Set config for animation when the card is visible
function useCardConfig ( hiding:boolean, duration:number ): Animated.Value {
  const animValue = new Animated.Value( 0 )
  const opacity = useRef( animValue ).current
  // Setting Animation
  useEffect( () => {
    const toValue = hiding ? Opacity.HIDE : Opacity.SHOW
    Animated.timing( opacity, {
      toValue,
      duration,
      useNativeDriver: true,
    } ).start()
  }, [ hiding ] )
  return opacity
}

export default useCardConfig