import { ResumeInfoContext } from '@/Context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetails from './Preview_Components/PersonalDetails'
import SummaryPreview from './Preview_Components/SummaryPreview'
import ProfessionalDetails from './Preview_Components/ProfessionalDetails'
import EducationDetails from './Preview_Components/EducationDetails'
import SkillsDetails from './Preview_Components/SkillsDetails'

const ResumePreview = () => {
    const {resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    
  return (
    <div className={`shadow-lg p-14 border-t-[20px] }`}
    style={{
        borderColor: resumeInfo?.themeColor
    }}
   >
        {/* Personal Details */}
           <PersonalDetails resumeInfo={resumeInfo} />
        {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo} />
        {/* Professional Details */}
         <ProfessionalDetails resumeInfo={resumeInfo} />
        {/* Eduction Details */}
          <EducationDetails resumeInfo={resumeInfo} />
        {/* Skills */}
        <SkillsDetails resumeInfo={resumeInfo} />
    </div>
  )
}

export default ResumePreview