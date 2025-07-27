import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Inputs/Input';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast'
import loginImg from '../assets/login.jpg'

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if(!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    //SIGNUP API CALL
    try {
      const response = await axiosInstance.post('/api/auth/signup',{
        fullname: username,
        email,
        password,
      })
      if(response.data && response.data.token) {
        localStorage.setItem('token',response.data.token)
        navigate('/Overview')
        toast.success(response.data.message);
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
    // <div className=''>
    // <div className='h-screen flex flex-col justify-center items-center'>
    
    // <div className='h-3/4 w-4/5 bg-[#97CADB] rounded-4xl shadow-[#97CADB]/40 shadow-lg flex flex-col items-center'>
    //   <div className='h-1/3 overflow-hidden rounded-b-3xl'>
    //     <img src='./src/assets/login.jpg' className='w-full rounded-3xl'/>
    //   </div>
      
    //   <div className='px-5 py-5 w-full text-center'>
    //   <h3 className='text-3xl pb-1.5 font-bold bg-clip-text text-transparent bg-[radial-gradient(circle,_#02457A,_#97CADB)] transition-all duration-1000'>Create Account</h3>
    //   <p className='text-[#018ABE] text-sm pb-2'>Enter your details to Signup</p>
    //   <form className='m-2' onSubmit={handleSignup}>
    //     <Input type="text" placeholder='John Doe' label='Username' value={username} onChange={({target}) => {setUsername(target.value)}}/>
    //     <Input type="text" placeholder='you@example.com' label='Email' value={email} onChange={({target}) => {setEmail(target.value)}}/>
    //     <Input type='password' placeholder='••••••••' label='Password' value={password} onChange={({target}) => {setPassword(target.value)}}/>
        
    //     {error && <div className='text-xs text-[#E63946] w-8/12 text-left mb-2 ml-17'>{error}</div>}

    //     <button className='bg-[#02457A]/20 h-9 w-32 text-lg font-semibold text-[#02457A] rounded-lg mt-3 mb-3 cursor-pointer hover:bg-[#02457A] hover:text-white/80' type='submit'>Signup</button>
    //     <p className='text-md text-[#018ABE] mt-1'>Already have an account? <Link to='/login' className='font-semibold text-[#02457A] hover:underline'>Login</Link></p>
    //   </form>
    //   </div>

    // </div>
    // </div>
    
    // {/* ui boxes */}
    // <div className="w-2/5 h-2/5 absolute -top-20 right-2 -z-20 rotate-45 rounded-full shadow-xl bg-[radial-gradient(circle_at_top_left,_#001B48,_#02457A,_#018ABE,_#97CADB,_#D6E8EE)]"/>
    // <div className="w-2/5 h-2/5 absolute -bottom-30 left-5 -z-20 rotate-45 rounded-full shadow-xl bg-[radial-gradient(circle_at_top_left,_#001B48,_#02457A,_#018ABE,_#97CADB,_#D6E8EE)]"/>
    // </div>

    <div className='w-screen h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center' style={{ backgroundImage: `url(${loginImg})`}}>
    <h3 className='absolute top-3 md:top-5 left-4 md:left-10 text-xl md:text-3xl font-semibold text-[#02457A]'>Rupee</h3>

    <div className='md:h-3/4 w-85/100 md:w-1/3 flex flex-col justify-center items-center rounded-3xl md:rounded-4xl p-3 md:p-2 bg-white shadow-sm shadow-gray-300'>
      <h3 className='text-2xl md:text-3xl font-bold text-[#02457A] m-2'>Create Account</h3>
      <p className='text-[#02457A]/70 text-xs md:text-sm md:p-1 md:w-3/4 text-center '>Simplify tracking your expenses and boost your finances with <span className='font-semibold text-sm md:text-[16px] text-[#02457A]/90'>Rupee</span>. Get started for free</p>
      <form className='md:w-1/2 flex flex-col justify-center items-center mt-1 md:mt-3' onSubmit={handleSignup}>
        <Input type="text" placeholder='John Doe' label='Username' value={username} onChange={({target}) => {setUsername(target.value)}}/>
        <Input type="text" placeholder='you@example.com' label='Email' value={email} onChange={({target}) => {setEmail(target.value)}}/>
        <Input type='password' placeholder='••••••••' label='Password' value={password} onChange={({target}) => {setPassword(target.value)}}/>
        
        {error && <div className='w-full text-left text-xs text-[#E63946] mt-2'>{error}</div>}

        <button className='w-full bg-[#02457A] text-sm text-white font-semibold rounded-xl px-3 py-2 cursor-pointer mb-2 mt-5 md:mt-6' type='submit'>Signup</button>
        <p className='text-sm text-[#018ABE] mt-2 mb-4'>Already have an account? <Link to='/login' className='text-[15px] font-semibold text-[#02457A] hover:underline'>Login</Link></p>
      </form>
    </div>
    </div>
  )
}

export default SignUp