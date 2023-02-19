import React, { useState, useRef } from 'react'
import { ReactReaderStyle, ReactReader, EpubView } from 'react-reader'

const Reader = ({bookUrl}) => {
  // And your own state logic to persist state
  const [location, setLocation] = useState(null)
  const [firstRenderDone, setFirstRenderDone] = useState(false)
  const renditionRef = useRef(null)
  const locationChanged = epubcifi => {
    // Since this function is also called on initial rendering, we are using custom state
    // logic to check if this is the initial render.
    // If you block this function from running (i.e not letting it change the page on the first render) your app crashes.

    if (!firstRenderDone) {
      setLocation(localStorage.getItem('book-progress')) // getItem returns null if the item is not found.
      setFirstRenderDone(true)
      return
    }

    // This is the code that runs everytime the page changes, after the initial render.
    // Saving the current epubcifi on storage...
    localStorage.setItem('book-progress', epubcifi)
    // And then rendering it.
    setLocation(epubcifi) // Or setLocation(localStorage.getItem("book-progress"))
  }
  //Themes
  const ccDark = {
    background: '#24273a',
    surface: '#1e2030',
    textPrimary: '#cad3f5',
    textBorder: '#b7bdf8',
    accent: '#b7bdf8'
  }

  return (
    <div style={{height: '100%', width: '100%'}}>
    <EpubView
      url={bookUrl}
      epubOptions={{
          allowPopups: true,
          flow: 'scrolled',
          manager: 'continuous'
      }}
      getRendition={(rendition) => {
        rendition.themes.register('custom', {
          "*": {
            color: `${ccDark.textPrimary}`,
          },
        })
        rendition.themes.select('custom')
      }}
      locationChanged={locationChanged}
    />
    </div>
  )
}

export default Reader