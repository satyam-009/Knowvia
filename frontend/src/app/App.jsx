import { Router } from './App.routes'
import React from 'react'
import { RouterProvider } from 'react-router-dom'
import"./index.css"
import { useAuth } from '../fetures/auth/hooks/useAuth'
import { useEffect } from 'react'

const App = () => {

  const Auth = useAuth();
  useEffect(() =>{
    Auth.fetchCurrentUser()

  },[])

  return (
    <div>
        <RouterProvider router={Router}/>
    </div>
  )
}

export default App

