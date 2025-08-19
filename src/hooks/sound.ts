import { Audio, AVPlaybackSource } from 'expo-av'
import { useEffect, useState } from 'react'

type Sound = Audio.Sound | null

// Load a sound source from assets and returns a function to play it
function useSound( source:AVPlaybackSource ): () => Promise<void> {
  const [ sound, setSound ] = useState( null as Sound )
  // Unloading sound when is not needed
  useEffect( () => {
    if( !sound ) { return }
    return () => { sound.unloadAsync() }
  }, [ sound ] )
  // Handling "play function"
  const play = async() => {
    const { sound } = await Audio.Sound.createAsync( source )
    setSound( sound )
    sound.playAsync()
  }
  return play
}

export default useSound
