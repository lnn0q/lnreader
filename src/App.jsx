import { useState } from 'react'

import Header from './Header'
import Login from './Login/Login'
import Content from './Content'
import Footer from './Footer'

function App() {
  const [count, setCount] = useState(0)
  const logged_in = true;

  return (
    <div className="App">
    {logged_in ?
      <>
        <Header />
        <Content />
        <Footer />
      </>
      :
      <Login />
    }


    </div>
  )
}

export default App
