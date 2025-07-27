import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../../components/navbar/Navbar'
import Headbar from '../../components/navbar/Headbar'
import { RiMenu2Fill } from "react-icons/ri";

const DashboardLayout = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const getUser = async () => {
        try {
          const response = await axiosInstance.get('/api/auth/get-user');
          if(response) {
            setUserData(response.data);
          }
        } catch(error) {
          if(error.response.data && error.response.status===401) {
            navigate('/login');
        }
      }
  }

  const logout = () => {
      setUserData(null);
      localStorage.removeItem('token');
      localStorage.clear();
      navigate('/login');
  }

  useEffect(()=> {
    getUser();
  },[])

  const [open, setOpen] = useState(false)

  return (
    <div>
      <Headbar userData={userData} open={open} setOpen={setOpen}/>
      <Navbar userData={userData} setUserData={setUserData} logout={logout} open={open} setOpen={setOpen}/>
      <div className='md:ml-[calc(0.145*100%)] px-4 md:px-7 pt-[100px] md:pt-[85px]'><Outlet/></div>
    </div>
  )
}

export default DashboardLayout
