import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import { useDispatch } from 'react-redux'
import { setUser, setToken } from "../storeAndSlices/authSlice"

const Login = () => {
  const emailRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const config = {
        headers: {
          "content-type": "application/json"
        },
        withCredentials: true
      }
      const response = await axios.post('/api/v1/users/login', { email, password }, config)
      console.log(response)
      const accessToken = response?.data?.data.accessToken
      const user = response?.data?.data.signedInUser
      dispatch(setUser(user))
      dispatch(setToken({accessToken}))
      setEmail('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])



  return (
    <div className=' text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-400 to-cyan-500 flex flex-col w-full items-center justify-center  gap-2'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 >Sign In</h1>
      <form className='flex text-black font-medium text-2xl flex-col w-10/12 gap-4 p-4 rounded-xl  '
        name='loginForm' onSubmit={handleLoginSubmit}>
        <label className='hidden' htmlFor="email">Email:</label>
        <input
          placeholder='email'
          type="text"
          id="email"
          name='email'
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className='border-black border-b-2 py-4 px-2 placeholder:text-center placeholder:font-extrabold text-center outline-none'
        />

        <label className='hidden' htmlFor="password">Password:</label>
        <input
          placeholder='password'
          type="password"
          id="password"
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          className='border-black border-b-2 py-4 px-2 placeholder:text-center placeholder:font-extrabold text-center  outline-none'
        />
        <button
          // disabled={!email || !password}
          className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  font-medium rounded-lg text-2xl  text-center me-2 mb-2 mt-4 h-16 cursor-pointer'
        >login</button>
      </form>
      <Link className='text-lg' to={"/register"}>Don't have an account? Sign Up</Link>
    </div>
  )
}

export default Login