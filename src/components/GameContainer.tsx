import React, { ReactElement } from 'react'
import { View, StyleSheet } from 'react-native'

type ReactElements = ReactElement | ReactElement[]

interface GameContainerProps { children:ReactElements }

const GameContainer = ( props:GameContainerProps ): ReactElement  => {
  const { children } = props
  return (
    <View style={ styles.container }>
      { children }
    </View>
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