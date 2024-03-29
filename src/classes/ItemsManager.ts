import Coordinates from '../types/Coordinates'
import Direction from '../enums/Direction'
import getRandomItem from '../functions/get_random_item'
import invertDirection from '../functions/invert_direction'
import Item from './Item'
import randomInt from '../functions/random_int'
import ReactSetter from '../types/ReactSetter'
import resolveAsMatrix from '../functions/resolve_as_matrix'
import sides from '../interfaces/sides'
import wait from '../functions/wait'
import { BOARD_GRID_SIZE } from '../data/constants.json'
import { ITEM_DISPLACEMENT_DURATION } from '../data/constants.json'

type AdjacentItem = [ Item, Direction ]

class ItemsManager {

  private static correctOrder: Coordinates[] = []  // This array was created to save the default order of the board
  private readonly list: Item[] = []

  constructor(
    colors: string[],
    private readonly setList: ReactSetter<Item[]>,
  ) {
    // Building items (them are sorted by default)
    for( let _this = 0; _this < colors.length; _this++ ) {
      const color: string = colors[ _this ]
      const { x, y } = resolveAsMatrix( _this, BOARD_GRID_SIZE )
      const tag: number = _this + 1
      const newItem = new Item( tag, x, y, color )
      // Saving default order
      ItemsManager.correctOrder[ _this ] = { x, y }
      this.list.push( newItem )
    }
    this.randomSort()
  }

  private updateState() {
    this.setList( [ ...this.list ] )
  }

  // Assign an specific order to the items
  private useOrder( items:Item[] ) {
    for( let _this = 0; _this < this.list.length; _this++ ) {
      // Using position of the reference in the current item
      const boardItem: Item = this.list[ _this ],
        referenceItem: Item = items[ _this ]
      boardItem.x = referenceItem.x
      boardItem.y = referenceItem.y
    }
    this.updateState()
  }

  // Move the item with the "tag" to the specified direction
  public go( tag:number, direction:Direction, updateState:boolean, ) {
    const targetIndex: number = tag - 1,
      target: Item = this.list[ targetIndex ]
    // Walking to "direction"
    if( direction === Direction.UP ) { target.y += -1 }
    else if( direction === Direction.LEFT ) { target.x += -1 }
    else if( direction === Direction.RIGHT ) { target.x += 1 }
    else if( direction === Direction.DOWN ) { target.y += 1 }
    if( updateState ) { this.updateState() }  // Updating state
  }

  // Returns the item providing its coordinates (undefined if it is the blank space)
  private getItemFrom( x:number, y:number ): Item | undefined {
    const { list } = this
    // Searching an item with this coordinates
    const searchResult: Item[] = list.filter( ( item:Item ) => {
      return item.x === x && item.y === y
    } )
    // Extracting result
    const itemAtThisPosition: Item | undefined = searchResult[ 0 ]
    return itemAtThisPosition
  }

  // Find the blank space
  private searchBlankSpace(): Coordinates {
    let x = 0,
      y = 0
    // Search in every cell the blank space
    for( let thisY = 0; thisY < BOARD_GRID_SIZE; thisY++ ) {
      for( let thisX = 0; thisX < BOARD_GRID_SIZE; thisX++ ) {
        const itemAtThisPosition: Item | undefined = this.getItemFrom( thisX, thisY )
        if( !itemAtThisPosition ) {  // Saving undefined values coordinates (blank space founded)
          x = thisX
          y = thisY
          break
        }
      }
    }
    return { x, y }
  }

  // Gets the adjacent items of an specific cell (and its directions)
  private getAdjacentItems( cell:Coordinates ): AdjacentItem[] {
    const adjacentItems: AdjacentItem[] = []
    for( const side of sides ) {
      // Calculating coordinates of this side
      const x: number = cell.x + side.x,
        y: number = cell.y + side.y
      // Checking if there is an item at this position
      const itemAtThisSide: Item | undefined = this.getItemFrom( x, y )
      if( itemAtThisSide ) {  // Saving item and direction
        const adjacentItem: AdjacentItem = [ itemAtThisSide, side.direction ]
        adjacentItems.push( adjacentItem ) 
      }
    }
    return adjacentItems
  }

  // Moves a random item to a random direction (only one time)
  private randomMove() {
    // Searching blank space, getting available items (around it) and selecting one random
    const blankSpace: Coordinates = this.searchBlankSpace(),
      availableItems: AdjacentItem[] = this.getAdjacentItems( blankSpace ),
      itemToMove: AdjacentItem = getRandomItem( availableItems )
    const [ item, itemDirection ] = itemToMove
    const { tag } = item
    // * To move the item to the blank space you must do it in the opposite direction to
    // where it is from the blank space
    const moveTo: Direction = invertDirection( itemDirection )
    this.go( tag, moveTo, false )  // Moving (without react state updates)
  }

  // Complete random sort
  public randomSort() {
    const randomMovements: number = randomInt( 200, 4000 )
    for( let count = 1; count <= randomMovements; count++ ) {
      this.randomMove()
    }
    // Checking if the random movements organized the board
    const boardOrganized: boolean = ItemsManager.isOrganized( this.list )
    if( boardOrganized ) { this.randomSort() }  // Try again
    else { this.updateState() }  // Updating state (applying changes)
  }

  // Returns "true" if the board is organized (every item is at its default position)
  public static isOrganized( list:Item[] ): boolean {
    let orderIsCorrect = true
    for( let _this = 0; _this < list.length; _this++ ) {
      const item: Item = list[ _this ],
        defaultOrder: Coordinates = ItemsManager.correctOrder[ _this ]
      // Checking if every item is at its default position
      const itemOrderIsCorrect: boolean = ( item.x === defaultOrder.x ) && ( item.y === defaultOrder.y )
      if( !itemOrderIsCorrect ) {
        orderIsCorrect = false
        break
      }
    }
    return orderIsCorrect
  }

  // Used to assign an specific order to an "ItemsManager" instance (treated like a promise)
  public static async useOrder( manager:ItemsManager, items:Item[] ) {
    manager.useOrder( items )
    await wait( ITEM_DISPLACEMENT_DURATION )
  }

}

export default ItemsManager