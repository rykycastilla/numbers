import CellCount from '../types/CellCount'
import useItemSize from './item_size'

// Calculates position on the board for an specific axis
function useAxisPosition( position:CellCount ): number {
  const itemSize = useItemSize()
  return itemSize * position
}

export default useAxisPosition