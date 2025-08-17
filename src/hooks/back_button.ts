import FunctionVoid from '../types/FunctionVoid'
import { BackHandler } from 'react-native'
import { useEffect } from 'react'

type BackCallback = ( exit:FunctionVoid ) => void

function useBackButton( callback:BackCallback ) {
  useEffect( () => {
    const backEvent = function() {
      callback( BackHandler.exitApp )
      return true
    }
    BackHandler.addEventListener( 'hardwareBackPress', backEvent )
    return () => BackHandler.removeEventListener( 'hardwareBackPress', backEvent )
  }, [] )
}

export default useBackButton