import { Box, Button, HStack, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import ProfessionalExpForm from './ProfessionalExpForm';
import { getAllSkills } from '../services/skillsService';
import { isProfessionalExperiencesValid, mapSkillsInProfessionalExperiences } from '../utils/validators';
import { addProfessionalExperience } from '../services/developerService';
import { useNavigate } from 'react-router-dom';


const initialState = {
    companyName: '',
    techStack: '',
    skills: [],
    duration: '',
  };

const DeveloperForm3 = ({goToNext, goToPrevious}) => {
    const [professionalExperiences, setProfessionalExperiences] = useState([initialState]);
    const [skillData, setSkillData] = useState([]);
    const [skills, setSkills] = useState([]);

     //toast feature
     const toast = useToast()

     //navigate
     const navigate = useNavigate()

     useEffect(()=>{
        getAllSkills().then((res)=>{
           setSkillData(res.data)
        })
    }, [])

    const handleAddMore = ()=>{
        setSkills([])
        setProfessionalExperiences([...professionalExperiences, { companyName: '', techStack: '', skills: [], duration: '' }])
    }

    const handleRemove = (index)=>{
        const newProfessionalExperiences = [...professionalExperiences];
        newProfessionalExperiences.splice(index, 1);
        setProfessionalExperiences(newProfessionalExperiences)
    }

    const handleChange = (e, index)=>{
        const {name, value} = e.target;
        const newProfessionalExperiences = [...professionalExperiences];
        if (name === 'companyName' || name === 'techStack' || name === 'duration') {
            newProfessionalExperiences[index][name] = value;
        }else
        if(name === 'add-skills'){
            newProfessionalExperiences[index].skills.push(value)
        }else
        if(name === 'remove-skills'){
            newProfessionalExperiences[index].skills = skills.filter((item)=> item._id !== value)
        }
        setProfessionalExperiences(newProfessionalExperiences)
    }

    const handleSubmitDetails = ()=>{
        if(isProfessionalExperiencesValid(professionalExperiences)){
            const payload = mapSkillsInProfessionalExperiences(professionalExperiences);
            addProfessionalExperience(payload).then((res)=>{
                
                if(!res.data.action){
                    toast({
                        title: res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "error",
                    });
                    
                }

                if(res.data.action){
                    toast({
                        title:res.data.message,
                        position: "top",
                        isClosable: true,
                        duration: 1000,
                        status: "success",
                    });
                    goToNext()
                    navigate("/")
                }
            })
            
        }else{
            toast({
                title: "All fields are required !",
                position: "top",
                isClosable: true,
                duration: 1000,
                status: "warning",
            });
        }
    }


  return (
    <div>
    <p className="font-semibold text-2xl">Professional Experience</p>
    <p className="text-gray-500">Fill out the details carefully!</p>
    <div>
      {professionalExperiences.map((item, index) => (
        <ProfessionalExpForm
          key={index}
          item={item}
          handleAddMore={handleAddMore}
          index={index}
          length={professionalExperiences.length}
          handleRemove={handleRemove}
          onChange={handleChange}
          skillData={skillData}
          skills={skills}
          setSkills={setSkills}
        />
      ))}
    </div>
  
    <div className="flex justify-center border-t border-gray-500 mt-4 pt-4">
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmitDetails}>
        Submit Details
      </button>
    </div>
  </div>
  )
}

export default DeveloperForm3
