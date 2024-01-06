import getRest from './get_rest'

// Add a "zero" if the provided value only have one number (to improve the format)
// Ex: '7' - '07'
function numberFixer( num:number ): string {
  let textNumber = String( num )
  const numLength: number = textNumber.length
  if( numLength === 1 ) { textNumber = `0${ textNumber }` }
  return textNumber
}

// Returns the number with the format 'hh:mm:ss' (providing seconds)
function timerFormat( seconds:number ): string {
  const [ minutes, finalSeconds ] = getRest( seconds, 60 )
  const [ finalHours, finalMinutes ] = getRest( minutes, 60 )
  // Fixing single number values
  const fixedSeconds: string = numberFixer( finalSeconds ),
    fixedMinutes: string = numberFixer( finalMinutes ),
    fixedHours: string = numberFixer( finalHours )
  return `${ fixedHours }:${ fixedMinutes }:${ fixedSeconds }`
}

export default timerFormat