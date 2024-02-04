import React, { ReactElement } from 'react'
import ReactElements from '../types/ReactElements'
import { Animated, StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

interface AnimatedBlurViewProps {
  intensity: number,
  children?: ReactElements,
  style?: object | object[],
}

// Provide compatibility with Animated API to Expo BlurView
const AnimatedBlurView = ( props:AnimatedBlurViewProps ): ReactElement => {
  const { intensity, children, style } = props
  return (
    <Animated.View style={ style }>
      <BlurView intensity={ intensity } style={ styles.blur } />
      { children }
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  blur: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  }
} )

export default AnimatedBlurView