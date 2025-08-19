import { BOARD_GRID_SIZE } from '../data/constants.json'

// Say if the specified position is out of the game board
function checkOutOfBoard( position:number ): boolean {
  const inBoard: boolean = ( 0 <= position ) && ( position < BOARD_GRID_SIZE )
  return !inBoard
}

export default checkOutOfBoard
