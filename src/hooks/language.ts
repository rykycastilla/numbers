import english from '../languages/english.json'  // Language interface
import Language from '../types/Language'
import spanish from '../languages/spanish.json'  // Language interface
import { NativeModules } from 'react-native'
import { useLocales } from 'expo-localization'

// To represents languages are used JSON interfaces

// Gets the current device language
function useLanguage(): Language {
  NativeModules.I18nManager.localeIdentifier
  const [ { languageCode:deviceLanguage } ] = useLocales()
  // Using spanish by default
  return ( deviceLanguage === 'es' ) ? spanish : english
}

export default useLanguage