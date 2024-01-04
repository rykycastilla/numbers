import AppState from '../types/AppState'
import { createContext, useContext } from 'react'

// Global state config, using React Context API

const AppContext = createContext( {} as AppState )
const AppStateProvider = AppContext.Provider

function useAppState(): AppState {
  const Context: AppState = useContext( AppContext )
  return Context
}

export default useAppState
export { AppState, AppStateProvider }