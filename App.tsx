import FunctionVoid from './src/types/FunctionVoid'
import load from './src/functions/load'
import React, { ReactElement, useEffect } from 'react'
import StartView from './src/views/StartView'
import useSplashScreen from './src/hooks/splash_screen'
import ViewportProvider from 'react-native-viewport-provider'
import { BASE_LIGHT_COLOR } from './src/data/styles.json'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

interface AppContentProps { onLayout:FunctionVoid }

// Root components
const AppContent = ( props:AppContentProps ): ReactElement => {
  const { onLayout } = props
  useEffect( onLayout, [] )
  return <StartView />
}

// App config
const App = (): ReactElement | null => {
  const { loaded, onLayout } = useSplashScreen( load )
  if( !loaded ) { return null }
  return (
    <>
      <StatusBar backgroundColor={ BASE_LIGHT_COLOR } style="dark" />
      <SafeAreaView>
        <ViewportProvider>
          <AppContent onLayout={ onLayout } />
        </ViewportProvider>
      </SafeAreaView>
    </>
  )
}

export default App