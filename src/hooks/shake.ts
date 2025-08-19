import AnimatedInterpolation from '../types/AnimatedInterpolation'
import Direction from '../enums/Direction'
import DirectionInX from '../types/DirectionInX'
import MovementFunction from '../types/MovementFunction'
import wait from '../functions/wait'
import wobbles from '../interfaces/wobbles'
import { Animated } from 'react-native'
import { useCallback, useRef } from 'react'
import { useDimensions } from 'react-native-viewport-provider'

// Returns a function to move the item to an specific direction (with an animation)
function useDisplace( animRef:Animated.Value, toValue:number ): MovementFunction {
  const duration = 80
  const displace = useCallback( async() => {
    Animated.timing( animRef, {
      toValue,
      duration,
      useNativeDriver: false,
    } ).start()
    await wait( duration )  // waiting animation end
  }, [] )
  return displace
}

// Returns a function to move the item to an specific direction and come back
function useWobble( animRef:Animated.Value, direction:DirectionInX ): MovementFunction {
  // Calculating values based on direction
  const goTo: number = direction === Direction.LEFT
    ? 1 : 2
  const comeBack = 0
  // Creating displacement
  const goMovement = useDisplace( animRef, goTo )
  const comeBackMovement = useDisplace( animRef, comeBack )
  const wobble: MovementFunction = useCallback( async() => {
    await goMovement()
    await comeBackMovement()
  }, [] )
  return wobble
}

interface ShakeResult {
  shake: MovementFunction,
  translate: object,
}

function useShake(): ShakeResult {
  // Creating animation values
  const animValue = new Animated.Value( 0 )
  const animRef = useRef( animValue ).current
  // Creating callbacks to shake (left and right)
  const leftWobble = useWobble( animRef, Direction.LEFT )
  const rightWobble = useWobble( animRef, Direction.RIGHT )
  const shake: MovementFunction = useCallback( async() => {
    for( const wobble of wobbles ) {
      // Follow instructions to shake (wait to every animation end)
      if( wobble === Direction.LEFT ) { await leftWobble() }
      else if( wobble === Direction.RIGHT )  { await rightWobble() }
    }
  }, [] )
  // Calculating displacement
  const { width } = useDimensions()
  const displacement: number = Math.round( width / 100 * 0.8 )
  // Parsing animation values
  const translate: AnimatedInterpolation = animRef.interpolate( {
    inputRange: [ 0, 1, 2 ],
    outputRange: [ 0, displacement * -1, displacement ],
  } )
  return { shake, translate }  // animation starter and React style
}

export default useShake
