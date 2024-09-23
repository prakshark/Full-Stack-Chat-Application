import './App.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './utils/AuthContext'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes'
import Room from './pages/Room'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          <Route element = {<PrivateRoutes/>}>
            <Route path="/" element={<Room />} />
          </Route>

            <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
