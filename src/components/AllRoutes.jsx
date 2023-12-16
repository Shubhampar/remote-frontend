import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DeveloperOnboardingForm from './Developers'
import ClientSignupForm from './Signup'
import DeveloperLoginForm from './DeveloperLoginForm'

const AllRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="/signup" element={<ClientSignupForm />} />
                <Route path="/developer-login" element={<DeveloperLoginForm/>} />
                <Route path="/developer-onboarding" element={<DeveloperOnboardingForm />} />
                {/* <Route path='/news' element={<News/>}/> */}
            </Routes>
        </div>
    )
}

export default AllRoutes