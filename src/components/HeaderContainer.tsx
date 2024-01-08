import React, { ReactElement } from 'react'
import ReactElements from '../types/ReactElements'
import { GAME_BUTTON_SIZE } from '../data/constants.json'
import { MARGIN } from '../data/styles.json'
import { StyleSheet, View } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

interface HeaderContainerProps { children:ReactElements }

const HeaderContainer = ( props:HeaderContainerProps ): ReactElement => {
  const { children } = props
  return (
    <View style={ useVP( styles.header ) }>
      { children }
    </View>
  )
}

const styles = StyleSheet.create( {
  header: {
    width: `100vw - ${ MARGIN } * 2` as unknown as number,
    height: GAME_BUTTON_SIZE as unknown as number,
    marginTop: MARGIN as unknown as number,
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
} )

export default HeaderContainer