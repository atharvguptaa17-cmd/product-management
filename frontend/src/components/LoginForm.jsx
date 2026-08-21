import React from 'react'
import { useState } from 'react';

const LoginForm = ({handleLogin}) => {

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const handleSubmit = (e)=>{

        e.preventDefault();

        setEmail(email);
        setPassword(password);

        console.log(email,password)

        handleLogin({email,password})


    }

  return (
    <div className='outer'>
       
        <div className='login-container'>
        <h2>Login</h2>
        
            <form className='login-form' onSubmit={handleSubmit}>
               <p>Email: admin@gmail.com</p>
               <p>Password: admin123</p>
            <div className='login-input'>
            <label>Email *</label>
            <input type='email' placeholder='Enter your email' required value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            </div>
            <div className='login-input'>
            <label>Password *</label>
            <input type='password' placeholder='Enter your password' required value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            </div>
            <button className='login-btn' type='submit'>Login</button>
           </form>
        
        </div>
    </div>

  )
}

export default LoginForm