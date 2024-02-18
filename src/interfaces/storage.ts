import AsyncStorage from '@react-native-async-storage/async-storage'

class StorageKey<T> {
  
  constructor(
    public readonly token: string,
    public readonly defaultValue: T,
  ) {}

}

class Storage {
  
  // Use to create new keys
  public readonly Key = StorageKey
  
  // Get value from persistent storage
  public async get<T>( storageKey:StorageKey<T> ): Promise<T> {
    // Extracting storage data
    const { token, defaultValue } = storageKey
    const result: string | null = await AsyncStorage.getItem( token )
    if( result === null ) { return defaultValue }  // Using default value
    // Using saved value
    const data: T = JSON.parse( result )
    return data
  }

  // Save value in persistent storage
  public async set<T>( storageKey:StorageKey<T>, newValue:T ) {
    const encodedData: string = JSON.stringify( newValue )  // Encoding to JSON
    await AsyncStorage.setItem( storageKey.token, encodedData )  // Saving
  }

  // Remove an item from the persistent storage
  public async remove<T>( storageKey:StorageKey<T> ) {
    await AsyncStorage.removeItem( storageKey.token )
  }

}

export default new Storage()