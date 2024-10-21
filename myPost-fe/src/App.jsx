import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './screen/auth/Login'
import Register from './screen/auth/Register'
import Home from './screen/homeScreen/Home'
import Layout from './screen/Layout'
import genereteToken from './token/GenereteToken'
import Profile from './screen/profile/Profile'

const App = () => {
  
  const [isLogin, seetIsLogin] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = genereteToken()
    if(token) {
      seetIsLogin(true)
    }
    setLoading(false)
  }, [])

  if(loading) {
    return (
      <p className='text-center w-screen h-screen text-3xl font-semibold ' >Loading Broo.....</p>
    )
  }

  console.info(loading)

  if (!isLogin) {
    return (
      <Routes>
            <Route path='/' element={<Login onLogin={()=> seetIsLogin(true)} />} />
            <Route path='/register' element={<Register/>} />
            <Route path='*'  element={<h1 className='flex justify-center items-center w-screen h-screen font-bold text-3xl' >page not found</h1>} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Layout/>} >
      <Route index element={<Home/>}/>
      <Route path='profile'  element={<Profile onLogOut={() => seetIsLogin(false)}/>}/>
      <Route path='*' element={<h1 className='flex justify-center items-center w-screen font-bold text-3xl h-screen' >Page Not Found</h1>}/>
      </Route>
    </Routes>
  )
}

export default App