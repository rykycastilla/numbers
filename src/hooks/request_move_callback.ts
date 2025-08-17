import checkOutOfBoard from '../functions/check_out_of_board'
import Direction from '../enums/Direction'
import Item from '../classes/Item'
import MovementFunction from '../types/MovementFunction'
import PausableState from '../classes/PausableState'
import sides from '../interfaces/sides'
import { GoFunction } from './items_manager'
import { useCallback } from 'react'

type Coordinates = `${ number };${ number }`

interface CoordinatesIndex {
  [ coordinates: Coordinates ]: number
}

// "gameSystem" is used by the function to identify if the request is valid
// The request is invalid when the system is paused (another move request is being executed)
const gameSystem = new PausableState()

interface RequestMoveParams {
  items: Item[],
  go: GoFunction,
  targetTag: number,
  impossibleFeedback: MovementFunction,
  playFeedback: () => Promise<void>
  playImpossibleFeedback: () => Promise<void>,
}

async function requestMove( params:RequestMoveParams ) {
  const { items, go, targetTag, impossibleFeedback, playFeedback, playImpossibleFeedback } = params
  // Checking if a new request is valid and pausing system
  if( !gameSystem.running ) { return }
  gameSystem.pause()
  // Indexing items coordinates to do a quick search
  const indexedTags: CoordinatesIndex = {}
  for( const item of items ) {
    const { x, y } = item
    const coordinates: Coordinates = `${ x };${ y }`
    indexedTags[ coordinates ] = item.tag
  }
  // Testing availability of the four adjacent sides to the target item, to find the blank space
  const targetIndex: number = targetTag - 1,
    target: Item = items[ targetIndex ]!
  let blankSpaceDirection: Direction | null = null
  for( const side of sides ) {
    // Calculating coordinates of this side
    const x: number = target.x + side.x,
      y: number = target.y + side.y
    // Checking if these coordinates are available (inside) in the board
    const outOfBoard: boolean = checkOutOfBoard( x ) || checkOutOfBoard( y )
    if( outOfBoard ) { continue }
    // Checking if there is an item at this side
    const coordinatesIndex: Coordinates = `${ x };${ y }`,
      adjacentItem: number | undefined = indexedTags[ coordinatesIndex ]
    if( adjacentItem === undefined ) {  // Blank space founded
      blankSpaceDirection = side.direction  // Saving its direction
      break
    }
  }
  // There is not a blank space around
  if( !blankSpaceDirection ) {
    playImpossibleFeedback()  // Sound
    await impossibleFeedback()
    gameSystem.play()
    return
  }
  // There is a blank space around
  playFeedback()  // sound
  await go( targetTag, blankSpaceDirection )  // Moving
  gameSystem.play()
}

type RequestMoveCallback = ( targetTag:number, impossibleFeedback:MovementFunction ) => Promise<void>

interface UseRequestMoveCallbackParams {
  items: Item[],
  go: GoFunction,
  playFeedback: () => Promise<void>
  playImpossibleFeedback: () => Promise<void>,
}

// Returns a function to request a move with it (passing the tag of the item to move)
function useRequestMoveCallback( params:UseRequestMoveCallbackParams ): RequestMoveCallback {
  const { items, go, playFeedback, playImpossibleFeedback } = params
  // Creating a React Hook with the function
  const requestMoveCallback: RequestMoveCallback = useCallback( async( targetTag:number, impossibleFeedback:MovementFunction ) => {
    await requestMove( { items, go, targetTag, impossibleFeedback, playFeedback, playImpossibleFeedback } )
  }, [ items ] )
  return requestMoveCallback
}

export default useRequestMoveCallback
export { RequestMoveCallback }