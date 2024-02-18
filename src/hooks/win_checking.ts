import Item from '../classes/Item'
import ItemsManager from '../classes/ItemsManager'
import MovementFunction from '../types/MovementFunction'
import useAppState from './app_state'
import win from '../functions/win'
import { useEffect } from 'react'

// Checks the order of the items to determines if you won
function useWinChecking( items:Item[], random:MovementFunction ) {
  const { timer, time } = useAppState()
  useEffect( () => {
    const boardOrganized: boolean = ItemsManager.isOrganized( items )
    // Win with the correct order
    if( boardOrganized ) { win( timer, time, random ) }
  }, [ items ] )
}

export default useWinChecking