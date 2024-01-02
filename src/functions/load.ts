import loadFonts from './load_fonts'

// Main promise to load the app (should be resolved during splash screen)
async function load() {
  await loadFonts()
}

export default load