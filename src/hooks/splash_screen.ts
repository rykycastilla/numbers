import FunctionVoid from '../types/FunctionVoid'
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'

preventAutoHideAsync()  // Keep showing splash screen by default

type AsyncFunction = () => Promise<void>

interface SplashScreenState {
  loaded: boolean,  // Indicates that the promise is resolved
  onLayout: FunctionVoid,  // Hide splash screen if the promise is resolved
}

// Returns a function (and a state) to hide splash screen when its promise is resolved
function useSplashScreen( callback:AsyncFunction ): SplashScreenState {
  const [ loaded, setLoaded ] = useState( false )
  // Resolving promise
  useEffect( () => {
    callback().then( () => {
      setLoaded( true )
    } )
  }, [] )
  // Setting onLayout (to hide splash screen)
  const onLayout = useCallback( () => {
    if( loaded ) { hideAsync() }
  }, [ loaded ] )
  return { loaded, onLayout }
}

export default useSplashScreen