import React from 'react'
import { Link } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../storeAndSlices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()

  const logoutUser = async() => {
    try {
      const response = await axiosPrivate.post('/api/v1/users/logout')
      dispatch(logout())
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className='bg-slate-500 w-full h-16 flex items-center justify-between px-5'>
      <div>
        LOGO
      </div>
      <div className='flex gap-4'>
        <Link to={""}>HOME</Link>
        <button onClick={logoutUser}>LOGOUT</button>
      </div>
    </section>
  )
}

export default Navbar