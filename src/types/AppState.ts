import ReactSetter from './ReactSetter'

// Type of the Global State

interface AppState {
  logged: boolean,
  setLogged: ReactSetter<boolean>,
}

export default AppState