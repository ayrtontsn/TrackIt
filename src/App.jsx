

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from "./pages/Login.jsx"
import SignupPage from "./pages/Signup.jsx"
import HabitsPage from './pages/Habits.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/cadastro' element={<SignupPage />} />
        <Route path='/habitos' element={<HabitsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


//<Route path='/hoje' element={<TodayPage />} />