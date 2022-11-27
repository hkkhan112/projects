import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import CreatePost from './pages/CreatePost'
import Home from './pages/Home'
import Post from './pages/Post'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from './pages/Login'
import Register from './pages/Register'
import { Context } from './context/Context'
import Profile from './pages/Profile'


const App = () => {
  const {user} = useContext(Context)
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home /> } />
      <Route path='/createpost' element={user ? <CreatePost /> : <Login />} />
      <Route path='/post/:postId' element={<Post />} />
      <Route path='/login' element={user ? <Home /> :<Login />} />
      <Route path='/register' element={user ? <Home /> : <Register />} />
      <Route path='/profile' element={user ? <Profile /> : <Login />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App