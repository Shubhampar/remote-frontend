import React from 'react'
import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react'
import { CheckIcon } from '@heroicons/react/outline';

const OnboardingStepper = ({activeStep, steps}) => {
  return (
    <div className="flex flex-col h-400px overflow-y-auto border border-gray-200">
    {steps.map((step, index) => (
      <div key={index} className="flex items-center">
        <div className="mr-4">
          {/* Step Indicator */}
          <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-300">
            {index < activeStep ? <CheckIcon /> : <span className="text-gray-500">{index + 1}</span>}
          </div>
        </div>
  
        <div className="flex flex-col">
          {/* Step Title */}
          <p className="font-semibold">{step.title}</p>
          {/* Step Description */}
          <p className="text-sm text-gray-500">{step.description}</p>
        </div>
  
        {/* Step Separator */}
        {index !== steps.length - 1 && <hr className="border-t border-gray-200 my-4" />}
      </div>
    ))}
  </div>
  )
}

export default OnboardingStepper
