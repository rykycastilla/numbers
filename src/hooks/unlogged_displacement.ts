import AnimatedInterpolation from '../types/AnimatedInterpolation'
import { Animated } from 'react-native'
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { useDimensions } from 'react-native-viewport-provider'

interface UnloggedDisplacementStyle {
  left: number,
  transform: { translateX:AnimatedInterpolation } [],
}

// Show the view from the right to log in (whow automatically if is logged by default)
function useUnloggedDisplacement( logged:boolean, duration:number ): UnloggedDisplacementStyle {
  const { width } = useDimensions()
  const initLoggedState: boolean = useMemo( () => logged, [] )  // Saving first login value
  const left: number = initLoggedState ? 0 : width
  // Setting animation
  const animValue = new Animated.Value( 0 )
  const animRef = useRef( animValue ).current
  // animation handler
  const move = useCallback( () => {
    const toValue = 1,
      useNativeDriver = false
    const animation = Animated.timing( animRef, { toValue, duration, useNativeDriver } )
    animation.start()
  }, [] )
  // Call animation when is logged (only if there is a login state change)
  useEffect( () => {
    const hasChange: boolean = logged !== initLoggedState
    if( logged && hasChange ) { move() }
  }, [ logged ] )
  // Parsing position
  const translateX: AnimatedInterpolation = animRef.interpolate( {
    inputRange: [ 0, 1 ],
    outputRange: [ 0, width * -1 ],
  } )
  const style = {  // This returned style must be applied to the main view to use this effect
    left,
    transform: [ { translateX } ],
  }
  return style
}

export default useUnloggedDisplacement
