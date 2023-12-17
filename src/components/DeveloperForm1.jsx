import React, { useEffect, useState } from 'react'
import { getAllSkills } from '../services/skillsService';
import { isPasswordValid, isValidEmail, isValidMobileNumber } from '../utils/validators';
import { registerDeveloper } from '../services/developerService';
import { setItemLS } from '../utils/localStorage';
import { useToast } from '@chakra-ui/react';

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    skills: []
}

const DeveloperForm1 = ({goToNext}) => {
    const [user, setUser] = useState(initialState);
    const [skills, setSkills] = useState([]);
    const [skillData, setSkillData] = useState([]);
    const [emailError, setEmailError] = useState("");
    const [passError, setPassError] = useState("");
    const [phoneError, setPhoneError] = useState("");


    //show-hide password
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    //toast feature
    const toast = useToast()

    useEffect(()=>{
        getAllSkills().then((res)=>{
           setSkillData(res.data)
        })
    }, [])


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

          if(name === "phoneNumber"){
            // Allow only numeric input
            const numericInput = value.replace(/\D/g, '');

            // Restrict the length to 10 digits
            value = numericInput.slice(0, 10);

            const err = isValidMobileNumber(value) ? "" : "Enter a valid 10-digit mobile number";
            setPhoneError(err);
          }

        setUser((prev)=>{
           return { ...prev, [name]: value}
        })
    }

    const handleSkillChange = (e)=>{
        const [skillID, name] = e.target.value.split(",")
        const skill = {
            _id: skillID,
            name: name
        }

        let existingSkill = skills.find((item)=> item.name === name)

        if(!existingSkill){
            setSkills((prev)=>{
                return [...prev, skill]
            })
        }

    }

    const handleRegister = ()=>{
        if(user.firstName && user.lastName && !emailError && !passError && !phoneError && skills.length >= 1){
            let skillsWithSkillIDs = skills.map((item)=> item._id);
            let developer = {...user, skills: skillsWithSkillIDs};
            registerDeveloper(developer).then((res)=>{
                if(res.data.action){
                    setItemLS("accessToken", res.data.accessToken)
                    toast({
                        title: `Registered successfully`,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    goToNext()
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

    const handleRemoveSkill = (skillID, name)=>{
        let filterSkills = skills.filter((item)=> item._id !== skillID)
        setSkills(filterSkills)
    }




  return (
    <div className="w-full">
  <p className="font-semibold text-2xl">Create an account</p>
  <p className="text-gray-500">It only takes a couple of minutes to get started!</p>
  <form>
    <div className="p-10">
      <div className="flex w-full gap-20 mt-20">
        <div className="w-1/2">
          <label>Firstname</label>
          <input
            type="text"
            placeholder="Firstname"
            name="firstName"
            value={user?.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>

        <div className="w-1/2">
          <label>Lastname</label>
          <input
            type="text"
            placeholder="Lastname"
            name="lastName"
            value={user?.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
      </div>

      <div className="mt-4">
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={user?.email}
          onChange={handleChange}
          className={`border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
        />
        {emailError && <span className="text-red-500">{emailError}</span>}
      </div>

      <div className="mt-4">
        <label>Password</label>
        <div className="flex">
          <input
            type={show ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={user?.password}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          />
          <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={handleClick}>
            {show ? 'Hide' : 'Show'}
          </button>
        </div>
        {passError && <span className="text-red-500">{passError}</span>}
      </div>

      <div className="mt-4">
        <label>Mobile</label>
        <input
          type="tel"
          placeholder="10 digits mobile number"
          name="phoneNumber"
          value={user?.phoneNumber}
          onChange={handleChange}
          className={`border ${phoneError ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 w-full`}
        />
        {phoneError && <span className="text-red-500">{phoneError}</span>}
      </div>

      <div className="mt-4">
        <label>Multiple Skills</label>
        <select onChange={handleSkillChange} className="border border-gray-300 rounded px-3 py-2 w-full">
          {skillData.map((item) => (
            <option key={item._id} value={`${item._id},${item.name}`}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1 w-full mt-2">
          {skills.map((item, index) => (
            <div key={index} className="shadow-md bg-blue-50 rounded-md p-2">
              <span>{item.name}</span>
              <span className="cursor-pointer text-blue-200 text-sm ml-1" onClick={() => handleRemoveSkill(item._id, item.name)}>
                X
              </span>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 mt-6 rounded">
        Register & Continue
      </button>
    </div>
  </form>
</div>
  )
}

export default DeveloperForm1
