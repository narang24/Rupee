import React from "react"
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Overview from './pages/TabPages/Overview'
import Expenses from './pages/TabPages/Expenses'
import Income from './pages/TabPages/Income'
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./pages/Layouts/DashboardLayout";
import Savings from "./pages/TabPages/Savings";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' exact element={<Login/>}/>
          <Route path='/signup' exact element={<SignUp/>}/>
          <Route path='/' exact element={<DashboardLayout/>}>
            <Route path='/Overview' exact element={<Overview/>}/>
            <Route path='/Expenses' exact element={<Expenses/>}/>
            <Route path='/Income' exact element={<Income/>}/>
            <Route path='/Savings' exact element={<Savings/>}/>
          </Route>
        </Routes>
      </Router>

      <Toaster
      position="top-center"
      reverseOrder={false}
      />
    </div>
  )
}

export default App
