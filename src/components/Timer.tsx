import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import ReactSetter from '../types/ReactSetter'
import useAppState from '../hooks/app_state'
import { BASE_DARK_COLOR, FONT_SIZE, MARGIN } from '../data/styles.json'
import { StyleSheet, Text } from 'react-native'
import { useVP } from 'react-native-viewport-provider'

type Timeout = NodeJS.Timeout
type StartTimerFunction = () => Timeout

// Returns a function to start the timer again (this timer works using loops to increase its value)
function useStartTimer( setTime:ReactSetter<number> ) {
  const startTimer: StartTimerFunction = useCallback( () => {
    const timerId: Timeout = setInterval( () => {  // Saving id of the loop to erase it when is not needed
      setTime( time => time + 1 )
    }, 1000 )
    return timerId
  }, [] )
  return startTimer
}

interface UseTimerStateParams {
  count: boolean,
  startTimer: StartTimerFunction,
  setTimerId: ReactSetter<Timeout|null>,
  timerId: Timeout | null,
}

// Pause the timer based on "count" value and erase previous "timer loops"
function useTimerState( params:UseTimerStateParams ) {
  const { count, startTimer, setTimerId, timerId } = params
  useEffect( () => {  // Starting timer again (and saving loop id with React State)
    if( count ) {
      const newTimerId: Timeout = startTimer()
      setTimerId( newTimerId )
    }
    else {  // Erasing loop (if there is)
      if( timerId === null ) { return }
      clearInterval( timerId )
      setTimerId( null )
    }
  }, [ count ] )
}

interface TimerProps { count:boolean }

const Timer = ( props:TimerProps ): ReactElement => {
  const { count } = props
  const { timer, setTimer } = useAppState()
  const [ timerId, setTimerId ] = useState<Timeout|null>( null )  // id of the loop used to increase the timer value
  const startTimer = useStartTimer( setTimer )  // Function to start the timer again
  // Pause the timer based on "count" value
  useTimerState( { count, startTimer, setTimerId, timerId } )
  return <Text style={ useVP( styles.timer ) }>{ timer }</Text>
}

const styles = StyleSheet.create( {
  timer: {
    marginBottom: MARGIN as unknown as number,
    color: BASE_DARK_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: 'Comfortaa'
  }
} )

export default Timer