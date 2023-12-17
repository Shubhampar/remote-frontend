import { Box,  Button,  FormControl, FormLabel, HStack, Input, VStack } from '@chakra-ui/react'
import React from 'react'


const EducationExpForm = ({item, handleAddMore, onChange, handleRemove, index, length}) => {

    const handleChange = (e) => {
        onChange(e, index);
    };

  return (
    <div>
    <form>
      <div className="mt-20">
        <div className="mb-4">
          <label>Degree</label>
          <input
            type="text"
            placeholder="Degree name"
            name="degreeName"
            value={item?.degreeName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
  
        <div className="mb-4">
          <label>School</label>
          <input
            type="text"
            placeholder="School name"
            name="schoolName"
            value={item?.schoolName}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
  
        <div className="mb-4">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Time period"
            name="duration"
            value={item?.duration}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
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

export default EducationExpForm
