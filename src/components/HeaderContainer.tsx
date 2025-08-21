import React, { ReactElement } from 'react'
import ReactElements from '../types/ReactElements'
import { GAME_BUTTON_SIZE } from '../data/constants.json'
import { MARGIN } from '../data/styles.json'
import { StyleSheet, View } from 'react-native'

interface HeaderContainerProps { children:ReactElements }

const HeaderContainer = ( props:HeaderContainerProps ): ReactElement => {
  const { children } = props
  return (
    <View style={ styles.header }>
      { children }
    </View>
  )
}

const styles = StyleSheet.create( {
  header: {
    width: '100%',
    height: GAME_BUTTON_SIZE,
    marginTop: MARGIN,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
} )

export default HeaderContainer
