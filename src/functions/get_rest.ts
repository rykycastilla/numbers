// Separate rest and result of the division (used for numbers descomposition)
function getRest( num:number, divider:number ): [ number, number ] {
  num = Math.floor( num )
  divider = Math.floor( divider )
  const result: number = Math.floor( num / divider ),
    rest: number = num % divider
  return [ result, rest ]
}

export default getRest
