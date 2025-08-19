import Opacity from '../enums/Opacity'
import OpacityStyle from '../types/OpacityStyle'
import { Animated } from 'react-native'
import { useCallback, useRef } from 'react'

type FadeAnimationFunction = ( toValue:Opacity ) => void

interface FadeAnimationResult {
  startFade: FadeAnimationFunction,
  opacityStyle: OpacityStyle
}

// Create handlersto use fade animations
function useFadeAnimation( duration:number ): FadeAnimationResult {
  // Creating animation values
  const animValue = new Animated.Value( Opacity.HIDE )
  const animRef = useRef( animValue ).current
  // Creating animation handler
  const startFade = useCallback( ( toValue:Opacity ) => {
    Animated.timing( animRef, {
      toValue,
      duration,
      useNativeDriver: true,
    } ).start()
  }, [ duration ] )  // eslint-disable-line
  // Creating style to apply animation on it
  const opacityStyle = { opacity: animRef }
  return { startFade, opacityStyle }
}

export default useFadeAnimation
export { FadeAnimationFunction }
