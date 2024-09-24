import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../storeAndSlices/authSlice'

const Navbar = () => {
  const dispatch = useDispatch()
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  const logoutUser = async() => {
    try {
      const response = await axiosPrivate.post('/api/v1/users/logout')
      dispatch(logout())
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const loginUser = () => {
    navigate('/login')
  }

  return (
    <section className='bg-slate-500 w-full h-16 flex items-center justify-between px-5'>
      <div>
        LOGO
      </div>
      <div className='flex gap-4'>
        <Link to={""}>HOME</Link>
        <Link to={"/men"}>MENS</Link>
        <Link to={"/women"}>WOMENS</Link>
        <Link to={"/kids"}>KIDS</Link>
        {user ? <button onClick={logoutUser}>LOGOUT</button> : <button onClick={loginUser}>LOGIN</button>}
      </div>
    </section>
  )
}

export default Navbar