import Item from '../classes/Item'
import ItemsManager from '../classes/ItemsManager'
import ReactSetter from './ReactSetter'

// Type of the Global State

interface AppState {
  logged: boolean,
  setLogged: ReactSetter<boolean>,
  timer: string,
  time: number,
  setTimer: ReactSetter<number>,
  manager: ItemsManager,
  items: Item[],
  gameRunning: boolean,
  setGameRunning: ReactSetter<boolean>,
}

export default AppState