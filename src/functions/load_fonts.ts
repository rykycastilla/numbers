import comfortaa from '../../assets/fonts/Comfortaa.ttf'
import comfortaaBold from '../../assets/fonts/Comfortaa-Bold.ttf'
import { loadAsync } from 'expo-font'

// Load custom fonts from assets
async function loadFonts(): Promise<void> {
  // Custom fonts ('Font-Name': resource)
  const fonts = {
    'Comfortaa': comfortaa,
    'Comfortaa-Bold': comfortaaBold, 
  }
  await loadAsync( fonts )  // Loading with expo
}

export default loadFonts