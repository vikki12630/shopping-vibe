import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../storeAndSlices/authSlice';

const Register = () => {

  const nameRef = useRef();
  const errRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [password, setPassword] = useState('');


  const [errMsg, setErrMsg] = useState('');

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const config = {
        headers:{
          "content-type":"application/json"
        },
        withCredentials: true
      }
      const respose = await axios.post('/api/v1/users/register',{name, lastname, email, phone, country, state, city, address, pincode, password}, config)

      const user = respose?.data?.data.createdUser
      const accessToken = respose?.data?.data.accessToken

      dispatch(setUser(user))
      dispatch(setToken(accessToken))
      setName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setCountry('')
      setState('')
      setCity('')
      setAddress('')
      setPincode('')
      setPassword('')
      
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  return (
    <div className=' text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-sky-400 to-cyan-500 flex flex-col w-full items-center justify-center  gap-2'>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 >Register</h1>
      <form className='flex text-black font-medium text-2xl flex-col w-3/5 gap-4 p-4 rounded-xl border-2 border-cyan-400 '
        name='registerForm' onSubmit={handleRegisterSubmit}>

        <div className='flex gap-6'>
          <div className='w-1/2 flex flex-col gap-4'>
            <div className='flex'>
              <label className='py-1 w-40' htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name='name'
                ref={nameRef}
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2'
              />
            </div>

            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="lastName">LastName:</label>
              <input
                type="text"
                id="lastName"
                name='lastName'
                onChange={(e) => setLastName(e.target.value)}
                value={lastname}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2 '
              />
            </div>


            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name='country'
                onChange={(e) => setCountry(e.target.value)}
                value={country}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 '
              />
            </div>

            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name='city'
                onChange={(e) => setCity(e.target.value)}
                value={city}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2 '
              />
            </div>
          </div>

          <div className='w-1/2 flex flex-col gap-4'>

            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name='email'
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2 '
              />
            </div>

            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="phone">Phone:</label>
              <input
                type="text"
                id="phone"
                name='phone'
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2 '
              />
            </div>

            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name='state'
                onChange={(e) => setState(e.target.value)}
                value={state}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2 '
              />
            </div>

            <div className=' flex'>
              <label className='py-1 w-40' htmlFor="pincode">Pincode:</label>
              <input
                type="text"
                id="pincode"
                name='pincode'
                onChange={(e) => setPincode(e.target.value)}
                value={pincode}
                required
                className='border-black rounded-xl w-full ml-3 pl-4 border-2 py-1 px-2 '
              />
            </div>

          </div>
        </div>

        <div className=' flex w-full'>
          <label className='my-auto w-32' htmlFor="address">Address:</label>
          <textarea
            id="address"
            rows={3}
            name='address'
            onChange={(e) => setAddress(e.target.value)}
            value={address}
            required
            className='border-black rounded-xl w-full ml-3 px-4 border-2 py-1 text-justify'
          />
        </div>

        <div className=' flex w-full'>
          <label className='my-auto w-32' htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name='password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className='border-black rounded-xl w-full ml-3 px-4 border-2 py-1 text-justify'
          />
        </div>
        <button
          // disabled={!email || !password}
          className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl  font-medium rounded-lg text-2xl  text-center mx-auto mb-2 mt-4 h-16 cursor-pointer w-1/2 '
        >Register</button>
      </form>
      <Link className='text-lg' to={"/register"}>Already have an account? Login</Link>
    </div>
  )
}

export default Register