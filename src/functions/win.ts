import Card from '../components/Card'
import MovementFunction from '../types/MovementFunction'
import RECORD_KEY from '../keys/record'
import storage from '../interfaces/storage'

// Player wins: stablish a new record (if it is possible) and restart the game
async function win( timer:string, time:number, random:MovementFunction ) {
  const record: number = await storage.get( RECORD_KEY ),
    isNewRecord: boolean = !( time >= record )
  if( isNewRecord ) { storage.set( RECORD_KEY, time ) }  // Setting new record
  const callerProps = {
    text: `Congratulations! You have won in ${ timer }`,
    importantText: isNewRecord ? 'NEW RECORD!' : undefined,
    isAlert: true,
    action: random,  // Restarting the game
  }
  Card.show( callerProps )
}

export default win