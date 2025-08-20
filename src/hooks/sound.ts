import { AudioSource, useAudioPlayer } from 'expo-audio'
import { useCallback } from 'react'

/**
 * Load a sound source from assets and returns a function to play it
 */
function useSound( source:AudioSource ): () => Promise<void> {
  const sound = useAudioPlayer( source )
  return useCallback( async() => {
    sound.seekTo( 0 )
    sound.play()
  }, [ sound ] )
}

export default useSound
