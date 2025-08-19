import Direction from '../enums/Direction'

// Returns the another direction of the same axis/
// Ex: right -> left
function invertDirection( direction:Direction ) {
  let newDirection: Direction
  switch( direction ) {
  case Direction.UP:
    newDirection = Direction.DOWN
    break
  case Direction.DOWN:
    newDirection = Direction.UP
    break
  case Direction.LEFT:
    newDirection = Direction.RIGHT
    break
  case Direction.RIGHT:
    newDirection = Direction.LEFT
    break
  }
  return newDirection
}

export default invertDirection
