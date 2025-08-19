declare module '*.png'
declare module '*.ttf'

declare module '*.mp3' {
  import { AVPlaybackSource } from 'expo-av'
  const source: AVPlaybackSource
  export default source
}
