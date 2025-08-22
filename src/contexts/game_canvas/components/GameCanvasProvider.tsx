import React, { ReactElement, ReactNode } from 'react'
import { DimensionValue, LayoutChangeEvent, StyleSheet, View } from 'react-native'
import { BOARD_GRID_SIZE } from '../../../data/constants.json'
import { GameCanvasContext } from '../context'
import { MARGIN } from '../../../data/styles.json'
import { useCallback, useState } from 'react'

interface GameCanvasProps {
  children: ReactNode
  width: DimensionValue
}

const GameCanvasProvider = ( props:GameCanvasProps ): ReactElement => {

  const { children, width } = props
  const [ itemSize, setItemSize ] = useState( 0 )

  const handleLayout = useCallback( ( event:LayoutChangeEvent ) => {
    const { width } = event.nativeEvent.layout
    setItemSize( ( width - MARGIN * 5 ) / BOARD_GRID_SIZE )  // calculating item size
  }, [] )

  return (
    <GameCanvasContext.Provider value={ { itemSize } }>
      <View style={ [ styles.container, { width } ] } onLayout={ handleLayout }>
        { children }
      </View>
    </GameCanvasContext.Provider>
  )

}

const styles = StyleSheet.create( {
  container: {
    aspectRatio: 1,
  },
} )

export default GameCanvasProvider

