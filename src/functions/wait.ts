// Create a promise to "await it" creating a lapse with the specified duration
function wait( time:number ): Promise<void> {
  const timer: Promise<void> = new Promise( resolve => {
    setTimeout( resolve, time )
  } )
  return timer
}

export default wait