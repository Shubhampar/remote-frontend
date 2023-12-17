import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { isPasswordValid, isValidEmail } from '../utils/validators';
import { registerClient } from '../services/clientService';


const initialState = {
    companyName: "",
    email: "",
    password: ""
}

const ClientSignup = () => {
    const [client, setClient] = useState(initialState);
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");

    //show-hide password
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

     //toast feature
     const toast = useToast()

    const handleChange = (e)=>{
        let {value, name} = e.target;

        if(name === "email"){
            const err = isValidEmail(value) ? "" : "enter valid email address";
            setEmailError(err);
        }
      
        if(name === "password"){
            const err = isPasswordValid(value) ? "" : "must contain one uppercase, one number, one special character";
            setPassError(err);
        }

        setClient((prev)=>{
            return { ...prev, [name]: value}
        })
    }

    const handleSignup = ()=>{
        if(client.companyName && !emailError && !passError){
            registerClient(client).then((res)=>{
                if(res.data.action){
                    toast({
                        title: `Registered successfully`,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    setClient(initialState)
                }

                if(!res.data.action){
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "error",
                    });
                }
            })
        }
    }



  return (
    <div className="w-400px mx-auto shadow-lg p-10">
    <form>
      <div className="space-y-4">
        <div>
          <label className="block">Organization</label>
          <input
            type="text"
            placeholder="Company"
            name="companyName"
            value={client?.companyName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
  
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={client?.email}
            onChange={handleChange}
            className={`border border-gray-300 rounded px-3 py-2 w-full ${emailError ? 'border-red-500' : ''}`}
          />
          {/* Display error message */}
          {true && <span className="text-red-500">{emailError}</span>}
        </div>
  
        <div>
          <label className="block">Password</label>
          <div className="relative">
            <input
              type={show ? 'text' : 'password'}
              placeholder="Password"
              name="password"
              value={client?.password}
              onChange={handleChange}
              className={`border border-gray-300 rounded px-3 py-2 w-full ${passError ? 'border-red-500' : ''}`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button className="h-7 w-7 flex items-center justify-center rounded border border-gray-300" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          {/* Display error message */}
          {passError && <span className="text-red-500">{passError}</span>}
        </div>
  
        <button className="bg-green-500 text-white px-4 py-2 mt-4" onClick={handleSignup}>Signup</button>
      </div>
    </form>
  </div>
  )
}

export default ClientSignup
