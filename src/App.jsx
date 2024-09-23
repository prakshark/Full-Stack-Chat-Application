import './App.css'
import LoginPage from './pages/LoginPage'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Room from './pages/Room'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route element = {<PrivateRoutes/>}>
        <Route path="/" element={<Room />} />
      </Route>

        <Route path="/login" element={<LoginPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
