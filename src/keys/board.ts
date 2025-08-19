import Item from '../classes/Item'
import storage from '../interfaces/storage'

export default new storage.Key<Item[]|undefined>( 'board', undefined )
