import React from 'react'
import { useEffect } from 'react'
import { useAuth } from '../utils/AuthContext';
import{ useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const {user} = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if(user) {
      navigate('/') 
    }
    else{
      navigate('/login') 
    }
  }, [])

  return (
    <div>
      LOGIN
    </div>
  )
}

export default LoginPage
