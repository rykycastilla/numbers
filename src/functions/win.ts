import BOARD_KEY from '../keys/board'
import Card from '../components/Card'
import Language from '../types/Language'
import MovementFunction from '../types/MovementFunction'
import playSound from '../functions/play_sound'
import ReactSetter from '../types/ReactSetter'
import RECORD_KEY from '../keys/record'
import storage from '../interfaces/storage'
import success from '../../assets/audio/success.mp3'
import TIMER_KEY from '../keys/timer'

interface WinParams {
  timer: string,
  time: number,
  random: MovementFunction,
  setGameRunning: ReactSetter<boolean>,
  language: Language,
}

// Player wins: stablish a new record (if it is possible) and restart the game
async function win( params:WinParams ) {
  playSound( success ) // Sound
  const { timer, time, random, setGameRunning, language } = params
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