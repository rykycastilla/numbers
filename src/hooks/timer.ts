import ReactSetter from '../types/ReactSetter'
import timerFormat from '../functions/timer_format'
import { useState } from 'react'

// Hook to transform an integer number to the format 'hh:mm:ss'
function useTimer(): [ string, ReactSetter<number> ] {
  const [ time, setTimer ] = useState( 0 )
  const timer: string = timerFormat( time )
  return [ timer, setTimer ]
}

export default useTimer