

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/Login.jsx"
import SignupPage from "./pages/Signup.jsx"
import HabitsPage from './pages/Habits.jsx'
import TodayPage from './pages/Today.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/cadastro' element={<SignupPage />} />
        <Route path='/habitos' element={<HabitsPage />} />
        <Route path='/hoje' element={<TodayPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


