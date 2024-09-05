

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/Login.jsx"
import SignupPage from "./pages/Signup.jsx"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/cadastro' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

//<Route path='/habitos' element={<HabitsPage />} />
//<Route path='/hoje' element={<TodayPage />} />