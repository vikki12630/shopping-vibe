import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Register from "./pages/Register"
import RequireAuth from "./components/RequireAuth"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>

        {/* protected route */}
        <Route element={<RequireAuth />}>
          <Route path="settings" element={< Settings/>}/>
        </Route>


      </Route>
      <Route path="*" element={< NotFound/>} />
    </Routes>
  )
}

export default App
