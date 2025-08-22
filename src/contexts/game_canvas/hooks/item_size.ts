import { GameCanvasContext } from '../context'
import { useContext } from 'react'

export function useItemSize(): number {
  const { itemSize } = useContext( GameCanvasContext )
  return itemSize
}
