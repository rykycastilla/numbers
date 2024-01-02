import { Animated } from 'react-native'
import { MARGIN } from '../data/styles.json'
import { SAMPLE_ITEM_SIZE } from '../data/constants.json'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useVP } from 'react-native-viewport-provider'

type AnimatedValue = Animated.AnimatedInterpolation<string|number>

function useSampleAnim( animated:boolean ): AnimatedValue {
  const duration = 500,
    lapse = 1500,
    useNativeDriver = false
  // Movement value
  const position = {
    left: `${ SAMPLE_ITEM_SIZE } + ${ MARGIN }`,
  }
  const { left } = useVP( position ) as { left:number }  // Calculating viewport values
  const animationValue = new Animated.Value( 0 )
  const animationRef = useRef( animationValue ).current
  // Creating animation
  const [ displaced, setDisplaced ] = useState( false )
  useEffect( () => {
    const toValue = displaced ? 1 : 0
    const animationSettings = { toValue, duration, useNativeDriver }
    const animation = Animated.timing( animationRef, animationSettings )
    animation.start()
  }, [ displaced ] )
  // Creating animation launcher
  const move = useCallback( () => {
    setInterval( () => {
      setDisplaced( displaced => !displaced )  // Alternating state
    }, duration + lapse )  // The animation waits to finish itself to start the another cycle
  }, [] )
  // Launching (only for animated items)
  useEffect( () => {
    if( animated ) { move() }
  }, [] )
  // Parsing position values
  const displacementX: AnimatedValue = animationRef.interpolate( {
    inputRange: [ 0, 1 ],
    outputRange: [ 0, left ],
  } )
  return displacementX
}

export default useSampleAnim