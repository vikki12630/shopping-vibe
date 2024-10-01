import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Men from "./pages/Men"
import Women from "./pages/Women"
import Kids from "./pages/Kids"
import Register from "./pages/Register"
import RequireAuth from "./components/RequireAuth"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import Admin from "./pages/Admin"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import useAxiosPrivate from "./hooks/useAxiosPrivate"
import { setUser } from "./storeAndSlices/authSlice"

function App() {
  const axiosPrivate = useAxiosPrivate();
  const user = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const getCurrentUser = async () => {
    try {
      const config = {
        withCredentials: true
      }
      const response = await axiosPrivate.post('/api/v1/users/getCurrentUser', config)
      // console.log(response.data.data)
      dispatch(setUser(response.data.data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [!user])
  
  

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="" element={<Home />} />
        <Route path="men" element={<Men />} />
        <Route path="women" element={<Women />} />
        <Route path="kids" element={<Kids />} />
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>

        {/* protected route */}
        <Route element={<RequireAuth />}>
          <Route path="/settings" element={< Settings/>}/>
          <Route path="/admin" element={<Admin/>}/>
          
        </Route>


      </Route>
      <Route path="*" element={< NotFound/>} />
    </Routes>
  )
}

export default App
