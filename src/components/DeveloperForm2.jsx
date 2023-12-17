import React, { useState } from 'react'
import EducationExpForm from './EducationExpForm'
import { Box, Button, HStack, Text, useToast } from '@chakra-ui/react'
import { isEducationalExperiencesValid } from '../utils/validators'
import { addEducationalExperience } from '../services/developerService'

const initialState = {
    degreeName: '', schoolName: '', duration: ''
}

const DeveloperForm2 = ({goToNext, goToPrevious}) => {
    const [educationalExperiences, setEducationalExperiences] = useState([initialState]);

     //toast feature
     const toast = useToast()

    const handleAddMore = ()=>{
        setEducationalExperiences([...educationalExperiences, { degreeName: '', schoolName: '', duration: '' }])
    }

    const handleRemove = (index)=>{
        const newEducationalExperiences = [...educationalExperiences];
        newEducationalExperiences.splice(index, 1);
        setEducationalExperiences(newEducationalExperiences)
    }

    const handleChange = (e, index)=>{
        const {name, value} = e.target;
        const newEducationalExperiences = [...educationalExperiences];
        newEducationalExperiences[index][name] = value;
        setEducationalExperiences(newEducationalExperiences)

    }

    const handleSubmitDetails = ()=>{
        if(isEducationalExperiencesValid(educationalExperiences)){
            addEducationalExperience(educationalExperiences).then((res)=>{
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
    <div className="p-4">
    <p className="font-semibold text-lg">Educational Experience</p>
    <p className="text-gray-500">Fill out the details carefully!</p>
    <div>
      {
        educationalExperiences.map((item, index) => (
          <EducationExpForm
            key={index}
            item={item}
            handleAddMore={handleAddMore}
            index={index}
            length={educationalExperiences.length}
            handleRemove={handleRemove}
            onChange={handleChange}
          />
        ))
      }
    </div>
  
    <div className="flex justify-center border-t border-gray-400 mt-4 pt-4">
      <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleSubmitDetails}>Submit Details</button>
    </div>
  </div>
  )
}

export default DeveloperForm2
