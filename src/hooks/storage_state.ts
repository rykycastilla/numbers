import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactSetter from '../types/ReactSetter'
import { useCallback, useMemo, useState } from 'react'

// Request information from the database
async function storageRequest<T>( key:string, state:T, setState:ReactSetter<T> ): Promise<T> {
  const result: string | null = await AsyncStorage.getItem( key )
  if( result === null ) { return state }
  else {
    const data: T = JSON.parse( result )
    setState( data )  // Setting saved value with React state by default (when it is ready)
    return data
  }
}

type StateResult<T> = [ T, ReactSetter<T>, Promise<T> ]

// Use async storage values as React States
function useStorageState<T>( initialState:T, key:string ): StateResult<T> {
  const [ state, setState ] = useState( initialState )  // Declaring state
  // Requesting data from torage
  const promise: Promise<T> = useMemo( () => {
    return storageRequest( key, state, setState )
  }, [] )
  // Creating custom setter (to save in async storage automatically)
  const setStorageState = useCallback( ( newState:T ) => {
    const encodedState: string = JSON.stringify( newState )
    AsyncStorage.setItem( key, encodedState )
    setState( newState )
  }, [] ) as ReactSetter<T>
  return [ state, setStorageState, promise ]  // Returning the "storage load" promise with the state handlers
}

export default useStorageState
