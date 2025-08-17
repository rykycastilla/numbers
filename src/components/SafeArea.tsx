import React, { ReactElement, ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'

interface SafeAreaProps {
  children: ReactNode
}

const SafeArea = ( props:SafeAreaProps ): ReactElement => {
  const { children } = props
  const { top, left, right, bottom } = useSafeAreaInsets()
  return (
    <View
      style={ { flex:1, marginTop:top, marginLeft:left, marginRight:right, marginBottom:bottom } }>
      { children }
    </View>
  )
}

export default SafeArea
