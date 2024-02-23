import { Audio, AVPlaybackSource } from 'expo-av'

// Play sounds loaded from assets
async function playSound( source:AVPlaybackSource ) {
  const { sound } = await Audio.Sound.createAsync( source )
  await sound.playAsync()
}

export default playSound