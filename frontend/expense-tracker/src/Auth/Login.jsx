import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Inputs/Input';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast'
import loginImg from '../assets/login.jpg'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if(!email || !password) {
      setError('All fields are required');
      return;
    }

    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    //LOGIN API CALL
    try {
      const response = await axiosInstance.post('/api/auth/login',{
        email: email,
        password: password,
      })
      if(response.data && response.data.token) {
        localStorage.setItem('token',response.data.token)
        navigate('/Overview')
        toast.success("Login Successfull!");
      }
    } catch(error) {
      if(error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } 
      else {
      setError('An unexpected error occurred. Please try again')
      }
    }
  }

    return (
    <div className='w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center' style={{ backgroundImage: `url(${loginImg})`}}>
    <h3 className='absolute top-3 md:top-5 left-4 md:left-10 text-xl md:text-3xl font-semibold text-[#02457A]'>Rupee</h3>

    <div className='md:h-3/4 w-4/5 md:w-1/3 flex flex-col justify-center items-center rounded-3xl md:rounded-4xl p-3 md:p-2 bg-white shadow-sm shadow-gray-300'>
      <h3 className='text-2xl md:text-3xl font-bold text-[#02457A] m-2'>Welcome Back!</h3>
      <p className='text-[#02457A]/70 text-xs md:text-sm md:p-1 md:w-3/4 text-center mb-2 md:mb-0'>Simplify tracking your expenses and boost your finances with <span className='font-semibold text-sm md:text-[16px] text-[#02457A]/90'>Rupee</span>. Get started for free</p>
      <form className='md:w-1/2 flex flex-col justify-center items-center mt-5' onSubmit={handleLogin}>
        <Input type="text" placeholder='you@example.com' label='Email' value={email} onChange={({target}) => {setEmail(target.value)}}/>
        <Input type='password' placeholder='••••••••' label='Password' value={password} onChange={({target}) => {setPassword(target.value)}}/>
        
        {error && <div className='w-full text-left text-xs text-[#E63946] mt-2'>{error}</div>}

        <button className='w-full bg-[#02457A] text-sm text-white font-semibold rounded-xl px-3 py-2 cursor-pointer mb-2 mt-6' type='submit'>Login</button>
        <p className='text-sm text-[#018ABE] my-4'>Don't have an account? <Link to='/signup' className='text-[15px] font-semibold text-[#02457A] hover:underline'>SignUp</Link></p>
      </form>
    </div>
    </div>
  )
}

export default Login
