import BOARD_KEY from '../keys/board'
import Card from '../components/Card'
import Language from '../types/Language'
import MovementFunction from '../types/MovementFunction'
import ReactSetter from '../types/ReactSetter'
import RECORD_KEY from '../keys/record'
import storage from '../interfaces/storage'
import TIMER_KEY from '../keys/timer'

interface WinParams {
  timer: string,
  time: number,
  random: MovementFunction,
  setGameRunning: ReactSetter<boolean>,
  playSuccess: () => Promise<void>
  language: Language,
}

// Player wins: stablish a new record (if it is possible) and restart the game
async function win( params:WinParams ) {
  const { timer, time, random, setGameRunning, playSuccess, language } = params
  playSuccess()  // Sound
  setGameRunning( false )  // Stopping the timer
  const record: number = await storage.get( RECORD_KEY ),
    isNewRecord: boolean = !( time >= record )
  if( isNewRecord ) { storage.set( RECORD_KEY, time ) }  // Setting new record
  const callerProps = {
    text: `${ language.winMessage } ${ timer }`,
    importantText: isNewRecord ? language.newRecord : undefined,
    isAlert: true,
    // Restarting the game
    action() {
      setGameRunning( true )  // Starting the timer again
      random()
    },
  }
  Card.show( callerProps )
  // Restarting player progress
  storage.remove( TIMER_KEY )
  storage.remove( BOARD_KEY )
}

export default win
