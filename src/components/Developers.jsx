import React, { useState } from 'react';
import ApiService from './ApiService';

const DeveloperOnboardingForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [professionalExperience, setProfessionalExperience] = useState([]);

  const handleSkillChange = (selectedSkills) => {
    setSkills(selectedSkills);
  };

  const handleEducationAdd = () => {
    setEducation([
      ...education,
      {
        degreeName: '',
        schoolName: '',
        timePeriod: '',
      },
    ]);
  };

  const handleProfessionalExperienceAdd = () => {
    setProfessionalExperience([
      ...professionalExperience,
      {
        companyName: '',
        techStack: '',
        skillsUsed: '',
        timePeriod: '',
      },
    ]);
  };

  const handleOnboardingSubmit = async () => {
    const onboardingData = {
      firstName,
      lastName,
      phoneNumber,
      email,
      skills,
      education,
      professionalExperience,
    };
    try {
      const response = await ApiService.registerDeveloper(onboardingData);
      // Handle successful onboarding submission (example: show a success message)
      console.log('Developer registered successfully!', response);
      // Reset the form fields or any necessary state variables here
    } catch (error) {
      // Handle error (example: show an error message)
      console.error('Error registering developer:', error.message);
      // Perform actions like showing an error message to the user or logging the error
    }
  };

  return (
    <div className="mx-auto max-w-md p-6 bg-white shadow-md rounded-md">
      <input
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Skills Selector Component */}
      {/* Educational Experience Component */}
      {education.map((edu, index) => (
        <div key={index}>
          <input
            className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
            type="text"
            placeholder="Degree Name"
            value={edu.degreeName}
            onChange={(e) =>
              setEducation((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, degreeName: e.target.value } : item
                )
              )
            }
          />
          {/* Add other educational fields similarly */}
        </div>
      ))}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleEducationAdd}
      >
        Add Education
      </button>

      {/* Professional Experience Component */}
      {professionalExperience.map((profExp, index) => (
        <div key={index}>
          <input
            className="mb-4 px-4 py-2 rounded-md border border-gray-300 w-full"
            type="text"
            placeholder="Company Name"
            value={profExp.companyName}
            onChange={(e) =>
              setProfessionalExperience((prev) =>
                prev.map((item, i) =>
                  i === index ? { ...item, companyName: e.target.value } : item
                )
              )
            }
          />
          {/* Add other professional experience fields similarly */}
        </div>
      ))}
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleProfessionalExperienceAdd}
      >
        Add Professional Experience
      </button>

      <button
        className="px-4 py-2 bg-green-500 text-white rounded-md"
        onClick={handleOnboardingSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default DeveloperOnboardingForm;
