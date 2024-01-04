import loadFonts from './load_fonts'

// Main promise to load the app (should be resolved during splash screen)
async function load( loggedPromise:Promise<boolean> ) {
  await loadFonts()
  await loggedPromise
}

export default load