import { createContext } from 'react'

export interface GameCanvasContext {
  itemSize: number
}

export const GameCanvasContext = createContext( null as unknown as GameCanvasContext )
