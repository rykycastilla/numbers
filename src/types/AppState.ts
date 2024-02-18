import ReactSetter from './ReactSetter'

// Type of the Global State

interface AppState {
  logged: boolean,
  setLogged: ReactSetter<boolean>,
  timer: string,
  time: number,
  setTimer: ReactSetter<number>,
}

export default AppState