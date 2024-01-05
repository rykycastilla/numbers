// It represents an interface that can "run" (boolean) and also can be paused and played
// An object create with this class is only simbolic, does not have a real function

class PausableState {

  private _running = true

  get running(): boolean {
    return this._running
  }

  public pause() {
    this._running = false
  }

  public play() {
    this._running = true
  }

}

export default PausableState