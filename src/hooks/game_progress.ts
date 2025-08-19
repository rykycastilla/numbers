
import BOARD_KEY from '../keys/board'
import Item from '../classes/Item'
import itemColors from '../data/item_colors.json'
import ItemsManager from '../classes/ItemsManager'
import ReactSetter from '../types/ReactSetter'
import storage from '../interfaces/storage'
import TIMER_KEY from '../keys/timer'
import { useMemo, useState } from 'react'

interface LoadProgressParams {
  setTimer: ReactSetter<number>,
  setItems: ReactSetter<Item[]>,
  setManager:ReactSetter<ItemsManager>,
}

async function loadGameProgress( params:LoadProgressParams ) {
  const { setTimer, setItems, setManager } = params
  // Loading timer
  const time: number = await storage.get( TIMER_KEY )
  setTimer( time )
  // Creating manager
  const manager = new ItemsManager( itemColors, setItems )
  setManager( manager )
  // Loading default items position
  const board: Item[] | undefined = await storage.get( BOARD_KEY )
  if( board ) {
    await ItemsManager.useOrder( manager, board )
  }
}

interface GameProgress {
  loadProgress: Promise<void>,
  manager: ItemsManager,
  items: Item[],
}

// Load default state of the current player's progress
function useGameProgress( setTimer:ReactSetter<number> ): GameProgress {
  const [ items, setItems ] = useState( [] as Item[] )
  // WARNING: you have to ensure that the loadProgress promise is resolved to use "manager"
  const [ manager, setManager ] = useState( null as unknown as ItemsManager )
  const loadProgress: Promise<void> = useMemo( () => {
    const args = { setTimer, setItems, setManager }
    return loadGameProgress( args )
  }, [] )  // eslint-disable-line
  return { loadProgress, manager, items }
}

export default useGameProgress
