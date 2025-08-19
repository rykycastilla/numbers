import useBoardPosition, { Position } from './board_position'
import { SAMPLE_ITEM_SIZE } from '../data/constants.json'

// Calculates position for the sample board
function useSamplePosition( initPosition:number ): Position {
  const gridSize = 3
  return useBoardPosition( initPosition, SAMPLE_ITEM_SIZE, gridSize )
}

export default useSamplePosition
