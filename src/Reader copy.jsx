import React, { useState, useRef } from 'react'
import { ReactReaderStyle, ReactReader } from 'react-reader'

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

  const ownStyles = {
    ...ReactReaderStyle,
    arrow: {
      ...ReactReaderStyle.arrow,
      display: 'none'
    },
    readerArea: {
      ...ReactReaderStyle.readerArea,
      backgroundColor: `${ccDark.background}`,
      color: `${ccDark.textPrimary}`
    },
    tocButton: {
      // ...ReactReaderStyle.tocButton,
      position: 'absolute',
      right: '50px',
      top: '20px',
      width: '20px',
      backgroundColor: `${ccDark.background}`,
      color: `${ccDark.background}`
    },
    tocButtonExpanded: {},
    // tocBackground: {
    //   // ...ReactReaderStyle.tocBackground,
    //   color: `${ccDark.background}`,
    //   backgroundColor: `${ccDark.background}`,
    // },
    tocAreaButton: {
      ...ReactReaderStyle.tocAreaButton,
      backgroundColor: `${ccDark.background}`,
      color: `${ccDark.textPrimary}`,
    },
  }

  return (
    <div style={{height: '100%', width: '100%'}}>
      <ReactReader
        url = {bookUrl}
        epubInitOptions={{
          openAs: 'epub'
        }}
        location={location}
        locationChanged={locationChanged}
        epubOptions={{
          allowPopups: true,
          flow: 'scrolled',
          manager: 'continuous'
        }}
        readerStyles={ownStyles}
        getRendition={(rendition) => {
          rendition.themes.register('custom', {
            "*": {
              color: `${ccDark.textPrimary}`,
              padding: "0 !important",
              margin: '0 !important'
            },
            p: {
              // 'font-family': 'Helvetica, sans-serif',
              'font-weight': '400',
              'font-size': '20px',
            }
          })
          rendition.themes.select('custom')
        }}
      />
    </div>
  )
}

export default Reader