import React, { ReactElement } from 'react'
import ReactElements from '../types/ReactElements'
import { Animated, StyleSheet } from 'react-native'
import { BASE_DARK_COLOR, BASE_LIGHT_COLOR } from '../data/styles.json'

interface ViewProps {
  children: ReactElements,
  style?: object,
}

// Template of an app window
const View = ( props:ViewProps ): ReactElement => {
  const { children, style } = props
  return (
    <Animated.View style={ [ styles.container, style ] }>
      { children }
    </Animated.View>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: BASE_LIGHT_COLOR,
    shadowColor: BASE_DARK_COLOR,
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 15,
  },
} )

export default View
