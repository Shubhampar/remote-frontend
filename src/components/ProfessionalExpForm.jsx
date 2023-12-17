import { Box,  Button,  Flex,  FormControl, FormLabel, HStack, Input, Select, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const ProfessionalExpForm = ({item, handleAddMore, onChange, handleRemove, index, length, skillData, skills, setSkills}) => {
    

    const handleChange = (e) => {
        onChange(e, index);
    };

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
            onChange({ target: { name: 'add-skills', value: skill } }, index)
        }

    }

    const handleRemoveSkill = (skillID, name)=>{
        let filterSkills = skills.filter((item)=> item._id !== skillID)
        onChange({ target: { name: 'remove-skills', value: skillID } }, index)
        setSkills(filterSkills)
    }


  return (
    <div>
  <form>
    <div className="mt-20 space-y-4">
      <div>
        <label className="block">Company</label>
        <input
          type="text"
          placeholder="Company name"
          name="companyName"
          value={item?.companyName}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block">Tech Stack</label>
        <input
          type="text"
          placeholder="Tech Stack"
          name="techStack"
          value={item?.techStack}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div>
        <label className="block">Duration</label>
        <input
          type="text"
          placeholder="Time period"
          name="duration"
          value={item?.duration}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
      </div>

      <div className="w-full">
        <label className="block">Multiple Skills</label>
        <select onChange={handleSkillChange} className="border border-gray-300 rounded px-3 py-2 w-full">
          {skillData.map((item) => (
            <option key={item._id} value={`${item._id},${item.name}`}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1 w-full mt-2">
          {item?.skills?.map((item, index) => (
            <div key={index} className="shadow-md bg-blue-50 rounded-md p-2">
              <span>{item.name}</span>
              <span className="cursor-pointer text-blue-200 text-sm ml-1" onClick={() => handleRemoveSkill(item._id, item.name)}>
                X
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </form>

  {/* Remove */}
  <div className="flex justify-end">
    {length > 1 && (
      <button className="bg-red-500 text-white px-4 py-2 mt-2" onClick={() => handleRemove(index)}>
        Remove
      </button>
    )}
  </div>

  {/* Add */}
  <div className="flex justify-end">
    {length - 1 === index && (
      <button className="bg-green-500 text-white px-4 py-2 mt-2" onClick={handleAddMore}>
        + Add More
      </button>
    )}
  </div>
</div>
  )
}

export default ProfessionalExpForm
