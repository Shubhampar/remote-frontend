import axios from 'axios';

const skillsAPI = "https://remote-server-u1uu.onrender.com/skills"

export const getAllSkills = async ()=>{
    try {
        const res = await axios.get(skillsAPI)
        return res;
    } catch (error) {
        console.log(error)
    }
}