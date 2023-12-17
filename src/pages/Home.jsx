import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();

    const handleClient = ()=>{
      navigate("/register-client")
    }
    const handleDeveloper = ()=>{
        navigate("/register-developer")
    }
  return (
    <div className="p-10 bg-blue-100">
    <div className="flex justify-center items-center min-h-80vh flex-col space-y-4">
      <button onClick={handleClient} className="bg-green-500 text-white shadow-lg px-4 py-2">Register as Client</button>
      <button onClick={handleDeveloper} className="bg-blue-500 text-white shadow-lg px-4 py-2">Register as Developer</button>
    </div>
  </div>
  )
}

export default Home
