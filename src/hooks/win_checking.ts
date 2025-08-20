import Item from '../classes/Item'
import ItemsManager from '../classes/ItemsManager'
import MovementFunction from '../types/MovementFunction'
import success from '../../assets/audio/success.mp3'
import useAppState from './app_state'
import useLanguage from '../hooks/language'
import useSound from './sound'
import win from '../functions/win'
import { useEffect } from 'react'

// Checks the order of the items to determines if you won
function useWinChecking( items:Item[], random:MovementFunction ) {
  const { timer, time, setGameRunning } = useAppState()
  const playSuccess = useSound( success )
  const language = useLanguage()
  useEffect( () => {
    const boardOrganized: boolean = ItemsManager.isOrganized( items )
    // Win with the correct order
    if( boardOrganized ) {
      const args = { timer, time, random, setGameRunning, playSuccess, language }
      win( args )
    }
  }, [ items ] )  // eslint-disable-line
}

export default useWinChecking
