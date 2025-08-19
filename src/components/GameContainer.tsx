import OpacityStyle from '../types/OpacityStyle'
import React, { ReactElement } from 'react'
import ReactElements from '../types/ReactElements'
import { Animated, StyleSheet } from 'react-native'

interface GameContainerProps {
  children: ReactElements,
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
} )

export default GameContainer
