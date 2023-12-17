import React from 'react'
import {Button, HStack, Text} from "@chakra-ui/react"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-between p-6 bg-blue-500 shadow-lg text-white">
  <p className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/")}>Remote</p>
  <button className="bg-blue-500 px-4 py-2 rounded">Login</button>
</div>
  )
}

export default Navbar
