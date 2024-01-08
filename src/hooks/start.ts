import Opacity from '../enums/Opacity'
import ReactSetter from '../types/ReactSetter'
import { FadeAnimationFunction } from './fade_animation'
import { GAME_VIEW_DISPLACEMENT_DURATION } from '../data/constants.json'
import { useEffect } from 'react'

// Initialyze the game logic. It should be used only to the start the game, after to load the view
function useStart( logged:boolean, startFade:FadeAnimationFunction, setGameRunning:ReactSetter<boolean> ) {
  useEffect( () => {
    if( !logged ) { return }
    setTimeout( () => {
      startFade( Opacity.SHOW )  // Using start animation
      setGameRunning( true )
    }, GAME_VIEW_DISPLACEMENT_DURATION )  // Waiting the login animation end to start the game
  }, [ logged ] )
}

export default useStart