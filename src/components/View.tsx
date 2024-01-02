import React, { ReactElement } from 'react'
import { BASE_LIGHT_COLOR } from '../data/styles.json'
import { StyleSheet, View as ReactView } from 'react-native'

interface ViewProps { 
  children: ReactElement | ReactElement[],
  style?: object,
}

// Template of an app window
const View = ( props:ViewProps ): ReactElement => {
  const { children, style } = props
  return (
    <ReactView style={ [ styles.container, style ] }>
      { children }
    </ReactView>
  )
}

const styles = StyleSheet.create( {
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: BASE_LIGHT_COLOR,
  }
} )

export default View