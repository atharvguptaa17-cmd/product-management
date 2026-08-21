import React, { useState } from 'react'
import axios from 'axios'
import LoginForm from '../components/LoginForm'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')

   const handleLogin = async(data)=>{
    setError('')
    try{
      const response = await axios.post('http://localhost:3000/api/auth/login',data)

      if(response.data.user.role==='admin'){
        navigate('/admin-dashboard')
      }else{
        setError('Only admin can login')
      }
    

    }catch(err){
      console.log("Error:", err)
      setError(err.response?.data?.message || 'Unable to login. Please check credentials.')
    }
    
  }

  return (
    <div>
      {error && <p style={{color: 'red', textAlign: 'center', marginTop: '10px'}}>{error}</p>}
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}

export default Login