

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/Login.jsx"
import SignupPage from "./pages/Signup.jsx"
import HabitsPage from './pages/Habits.jsx'
import TodayPage from './pages/Today.jsx'

import { useState } from 'react'

import userContext from './contexts/UserContext.js'
import tokenContext from './contexts/TokenContext.js'

function App() {
  const [usuario,setUsuario] = useState("");
  const [token,setToken] = useState(localStorage.getItem("token"));

  return (
       
    <tokenContext.Provider value={{token, setToken}}>
      <userContext.Provider value={{usuario, setUsuario}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/cadastro' element={<SignupPage />} />
            <Route path='/habitos' element={<HabitsPage />} />
            <Route path='/hoje' element={<TodayPage />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </tokenContext.Provider>
  )
}

export default App


