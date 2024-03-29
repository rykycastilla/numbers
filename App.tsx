import FunctionVoid from './src/types/FunctionVoid'
import GameView from './src/views/GameView'
import load from './src/functions/load'
import React, { ReactElement, useEffect, useState } from 'react'
import StartView from './src/views/StartView'
import useAppState, { AppState, AppStateProvider } from './src/hooks/app_state'
import useGameProgress from './src/hooks/game_progress'
import useSplashScreen from './src/hooks/splash_screen'
import useStorageState from './src/hooks/storage_state'
import useTimer from './src/hooks/timer'
import ViewportProvider from 'react-native-viewport-provider'
import { BASE_LIGHT_COLOR } from './src/data/styles.json'
import { LOGGED_KEY } from './src/data/storage_keys.json'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

interface AppContentProps { onLayout:FunctionVoid }

// Root components
const AppContent = ( props:AppContentProps ): ReactElement => {
  const { onLayout } = props
  const { logged } = useAppState()
  useEffect( () => {
    if( !logged ) { StartView.show() }
    onLayout()
  }, [] )
  return (
    <>
      <StartView />
      <GameView />
    </>
  )
}

// App config
const App = (): ReactElement | null => {
  const [ logged, setLogged, loggedPromise ] = useStorageState( false, LOGGED_KEY )
  const [ timer, setTimer, time ] = useTimer()  // Creating timer
  const { loadProgress, manager, items } = useGameProgress( setTimer )
  const { loaded, onLayout } = useSplashScreen( async() => {
    await load( loggedPromise, loadProgress )
  } )
  const [ gameRunning, setGameRunning ] = useState( false )
  const value: AppState = { logged, setLogged, timer, setTimer, time, manager, items, gameRunning, setGameRunning,
  }
  if( !loaded ) { return null }
  return (
    <AppStateProvider value={ value }>
      <StatusBar backgroundColor={ BASE_LIGHT_COLOR } style="dark" />
      <SafeAreaView>
        <ViewportProvider>
          <AppContent onLayout={ onLayout } />
        </ViewportProvider>
      </SafeAreaView>
    </AppStateProvider>
  )
}

export default App