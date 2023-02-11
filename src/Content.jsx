import React, { useState } from 'react'
import Reader from './Reader'

const Content = () => {
  let isReading = false;
  let bookUrl;

  return (
    <main>
      {isReading ?
        <Reader bookUrl/>
        :
        <div className='booksGrid'>

        </div>
      }
    </main>
  )
}

export default Content