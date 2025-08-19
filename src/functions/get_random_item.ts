// Select any item of the array
function getRandomItem<T>( array:T[] ): T {
  const clone: T[] = [ ...array ]
  clone.sort( () => Math.random() - 0.5 )
  return clone[ 0 ]!
}

export default getRandomItem
