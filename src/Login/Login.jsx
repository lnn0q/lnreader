import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <main className='mainLoginContainer'>
      <label className='titleLoginContainer'>
        <p>lnreader.</p>
        <p>always by your hand.</p>
      </label>
      <form className='loginForm'>
          <label>Login</label>
          <div className='credContainer'>
              <input type='text' placeholder='login'/>
              <input type='password' placeholder='password'/>
              <button onClick={(e) => {e = e.preventDefault()}}>Log in</button>
          </div>
      </form>
    </main>
  )
}

export default Login