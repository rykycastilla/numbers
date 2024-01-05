import Direction from '../enums/Direction'
import Item from './Item'
import ReactSetter from '../types/ReactSetter'
import resolveAsMatrix from '../functions/resolve_as_matrix'
import { BOARD_GRID_SIZE } from '../data/constants.json'

class ItemsManager {

  private readonly list: Item[] = []

  constructor(
    colors: string[],
    private readonly setList: ReactSetter<Item[]>
  ) {
    // Building items (them are sorted by default)
    for( let _this = 0; _this < colors.length; _this++ ) {
      const color: string = colors[ _this ]
      const { x, y } = resolveAsMatrix( _this, BOARD_GRID_SIZE )
      const tag: number = _this + 1
      const newItem = new Item( tag, x, y, color )
      this.list.push( newItem )
    }
    setList( this.list )  // Updating state
  }

  // Move the item with the "tag" to the specified direction
  public go( tag:number, direction:Direction ) {
    const targetIndex: number = tag - 1,
      target: Item = this.list[ targetIndex ]
    // Walking to "direction"
    if( direction === Direction.UP ) { target.y += -1 }
    else if( direction === Direction.LEFT ) { target.x += -1 }
    else if( direction === Direction.RIGHT ) { target.x += 1 }
    else if( direction === Direction.DOWN ) { target.y += 1 }
    this.setList( [ ...this.list ] )  // Updating state
  }

}

export default ItemsManager