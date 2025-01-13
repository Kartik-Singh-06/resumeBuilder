import { useUser } from '@clerk/clerk-react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Header from './Components/ui/Header/Header';


const App = () => {
  const {user, isLoaded , isSignedIn} = useUser();
  if(!isSignedIn && isLoaded){
    return <Navigate to={'/auth/signin'}/>
  }
  return (
    <div>
      <Header/>
     <Outlet/>
    </div>
  )
}

export default App