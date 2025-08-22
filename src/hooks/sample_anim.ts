import AnimatedInterpolation from '../types/AnimatedInterpolation'
import { Animated } from 'react-native'
import { MARGIN } from '../data/styles.json'
import { SAMPLE_ITEM_SIZE } from '../data/constants.json'
import { useCallback, useEffect, useRef, useState } from 'react'

function useSampleAnim( animated:boolean ): AnimatedInterpolation {
  const duration = 500,
    lapse = 1500,
    useNativeDriver = false
  // Movement value
  const left: number = SAMPLE_ITEM_SIZE + MARGIN
  const animationValue = new Animated.Value( 0 )
  const animationRef = useRef( animationValue ).current
  // Creating animation
  const [ displaced, setDisplaced ] = useState( false )
  useEffect( () => {
    const toValue = displaced ? 1 : 0
    const animationSettings = { toValue, duration, useNativeDriver }
    const animation = Animated.timing( animationRef, animationSettings )
    animation.start()
  }, [ displaced ] )  // eslint-disable-line
  // Creating animation launcher
  const move = useCallback( () => {
    setInterval( () => {
      setDisplaced( displaced => !displaced )  // Alternating state
    }, duration + lapse )  // The animation waits to finish itself to start the another cycle
  }, [] )
  // Launching (only for animated items)
  useEffect( () => {
    if( animated ) { move() }
  }, [] )  // eslint-disable-line
  // Parsing position values
  const displacementX: AnimatedInterpolation = animationRef.interpolate( {
    inputRange: [ 0, 1 ],
    outputRange: [ 0, left ],
  } )
  return displacementX
}

export default useSampleAnim
