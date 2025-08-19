import BOARD_KEY from '../keys/board'
import storage from '../interfaces/storage'
import TIMER_KEY from '../keys/timer'
import useAppState from './app_state'
import { useEffect } from 'react'

// Saves the current state of the game to use in next sessions
function useProgressSaver() {
  const { time, items } = useAppState()
  useEffect( () => {
    storage.set( TIMER_KEY, time )
    storage.set( BOARD_KEY, items )
  }, [ time, items ] )
}

export default useProgressSaver
