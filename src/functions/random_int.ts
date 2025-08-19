// Generate a random value between the provided range
function randomInt( _from:number, to:number ): number {
  _from = Math.floor( _from )
  to = Math.floor( to )
  const range: number = to - _from
  if( range <= 0 ) { return 0 }
  const root: number = Math.random(),
    intValue: number = Math.round( root * range )
  return intValue + _from
}

export default randomInt
