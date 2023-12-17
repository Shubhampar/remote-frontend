import { Box, Container, useSteps } from '@chakra-ui/react'
import React from 'react'
import OnboardingStepper from '../components/OnboardingStepper'
import DeveloperForm1 from '../components/DeveloperForm1'
import DeveloperForm3 from '../components/DeveloperForm3'
import DeveloperForm2 from '../components/DeveloperForm2'

const steps = [
    { title: 'Registeration', description: 'Basic Details' },
    { title: 'Education', description: 'Educational Details' },
    { title: 'Work Experience', description: 'Professional Experience' },
]
  

const DeveloperSignup = () => {
    const { activeStep, goToNext, goToPrevious } = useSteps({
        index: 0,
        count: steps.length,
    })



  return (
    <div className="min-h-screen p-10">
    <div className="min-w-5xl p-8 flex justify-between border-2 border-skyblue shadow-lg rounded-md">
      <OnboardingStepper activeStep={activeStep} steps={steps} />
      <div className="w-600px">
        {activeStep === 0 && <DeveloperForm1 goToNext={goToNext} />}
        {activeStep === 1 && <DeveloperForm2 goToPrevious={goToPrevious} goToNext={goToNext} />}
        {activeStep === 2 && <DeveloperForm3 goToPrevious={goToPrevious} goToNext={goToNext} />}
      </div>
    </div>
  </div>
  )
}

export default DeveloperSignup
