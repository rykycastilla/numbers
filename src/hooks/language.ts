import english from '../languages/english.json'  // Language interface
import Language from '../types/Language'
import spanish from '../languages/spanish.json'  // Language interface
import { useLocales } from 'expo-localization'

// To represents languages are used JSON interfaces

// Gets the current device language
function useLanguage(): Language {
  const [ locales ] = useLocales()
  if( locales === undefined ) { return english }
  const { languageCode } = locales
  // Using spanish by default
  return ( languageCode === 'es' ) ? spanish : english
}

export default useLanguage