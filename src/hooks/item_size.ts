import { ITEM_SIZE } from '../data/constants.json'
import { MARGIN } from '../data/styles.json'
import { useVP } from 'react-native-viewport-provider'

function useItemSize(): number {
  const style = { width: `${ ITEM_SIZE } + ${ MARGIN }` }
  const { width } = useVP( style ) as { width:number }
  return width
}

export default useItemSize
