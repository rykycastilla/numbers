import FunctionVoid from '../types/FunctionVoid'
import { BackHandler } from 'react-native'
import { useEffect } from 'react'

type BackCallback = ( exit:FunctionVoid ) => void

function useBackButton( callback:BackCallback ) {
  useEffect( () => {
    const handler = BackHandler.addEventListener( 'hardwareBackPress', () => {
      callback( BackHandler.exitApp )
      return true
    } )
    return () => handler.remove()
  }, [] )  // eslint-disable-line
}

export default useBackButton
