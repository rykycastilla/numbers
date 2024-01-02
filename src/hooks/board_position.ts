import resolveAsMatrix from '../functions/resolve_as_matrix'
import { MARGIN } from '../data/styles.json'
import { useVP } from 'react-native-viewport-provider'

// Set the position value using the previous objects
function calcPosition( gridPos:number, itemSize:string ): string {
  return  `( ${ itemSize } + ${ MARGIN } ) * ${ gridPos }`
}

interface Position {
  top: number,
  left: number,
}

// These are single Position properties with viewport units (them need to be parsed) 
interface RawPosition {
  top: string,
  left: string,
}

function useBoardPosition( position:number, itemSize:string, gridSize:number ): Position {
  const { x, y } = resolveAsMatrix( position, gridSize )  // Calculating grid position
  // Calculating coordinates based on the grid
  const top: string = calcPosition( y, itemSize ),
    left: string = calcPosition( x, itemSize ),
    rawPosition: RawPosition = { top, left }
  // Parsing coordinates as viewport values
  const calculatedPosition = useVP( rawPosition ) as Position
  return calculatedPosition
}

export default useBoardPosition
export { Position }