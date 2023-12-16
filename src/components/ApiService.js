import axios from 'axios';

const BASE_URL = 'https://remote-server-u1uu.onrender.com/';

const registerClient = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      const token = response.data.token; // Assuming the token is returned in the response
      
      // Save token to local storage
      localStorage.setItem('clientToken', token);
  
      return response.data;
    } catch (error) {
      throw new Error('Failed to register client');
    }
  };
  
  const registerDeveloper = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, data);
      const token = response.data.token; // Assuming the token is returned in the response
      
      // Save token to local storage
      localStorage.setItem('developerToken', token);
  
      return response.data;
    } catch (error) {
      throw new Error('Failed to register developer');
    }
  };

const addEducationalExperience = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-education`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add educational experience');
  }
};

const addProfessionalExperience = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-profession`, data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to add professional experience');
  }
};

export default {
  registerDeveloper,
  addEducationalExperience,
  addProfessionalExperience,
  registerClient,
  // Other API calls if needed
};


