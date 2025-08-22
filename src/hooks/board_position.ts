import resolveAsMatrix from '../functions/resolve_as_matrix'
import { MARGIN } from '../data/styles.json'

// Set the position value using the previous objects
function calcPosition( gridPos:number, itemSize:number ): number {
  return  ( itemSize + MARGIN ) * gridPos
}

interface Position {
  top: number,
  left: number,
}

function useBoardPosition( position:number, itemSize:number, gridSize:number ): Position {
  const { x, y } = resolveAsMatrix( position, gridSize )  // Calculating grid position
  // Calculating coordinates based on the grid
  const top: number = calcPosition( y, itemSize ),
    left: number = calcPosition( x, itemSize )
  return { top, left }
}

export default useBoardPosition
export { Position }
