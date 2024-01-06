import OpacityStyle from '../types/OpacityStyle'
import React, { ReactElement } from 'react'
import { Animated, StyleSheet } from 'react-native'

interface GameContainerProps {
  children: ReactElement | ReactElement[],
  style: OpacityStyle,
}

// View containing elements of the main view (support start animation)
const GameContainer = ( props:GameContainerProps ): ReactElement  => {
  const { children, style:opacityStyle } = props
  return (
    <Animated.View style={ [ styles.container, opacityStyle ] }>
      { children }
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
} )

export default GameContainer