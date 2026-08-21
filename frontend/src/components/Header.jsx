import React from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
  return (
    <div className='header'>
      <h4>Welcome to Admin Dashboard</h4>
      <button className='logout-btn' onClick={()=>(navigate('/login'))}>Logout</button>
    </div>
  )
}

export default Header