import Direction from '../enums/Direction'
import Item from '../classes/Item'
import ItemsManager from '../classes/ItemsManager'
import wait from '../functions/wait'
import { ITEM_DISPLACEMENT_DURATION } from '../data/constants.json'
import { useCallback, useMemo, useState } from 'react'

type GoFunction = ( tag:number, drection:Direction ) => Promise<void>

// Returns the current position of the items and a "go function" to redirect an specific item 
function useItemsManager( colors:string[] ): [ Item[], GoFunction ] {
  const [ items, setItems ] = useState( [] as Item[] )
  // Building manager ( using setter to update the state with every position change )
  const manager: ItemsManager = useMemo( () => {
    return new ItemsManager( colors, setItems )
  }, [] )
  // Creating go function. It is async because you can wait with it the estimated duration of the item animation
  const go = useCallback( async( tag:number, direction:Direction ) => {
    manager.go( tag, direction )
    await wait( ITEM_DISPLACEMENT_DURATION )
  }, [] )
  return [ items, go ]
}

export default useItemsManager
export { GoFunction }