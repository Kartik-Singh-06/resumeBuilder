import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCard = ({resumeDetails}) => {
  return (
    <Link to={`/dashboard/resume/${resumeDetails.resumeId}/edit`}>
      <div className='w-[12vw] h-[30vh] rounded-md cursor-pointer flex justify-center items-center bg-[#e8e8e8] hover:scale-105 transition-all hover:shadow-lg mb-2'>
         <Notebook/>
      </div>
      <h2 className='text-sm font-medium text-[#545353]'>{resumeDetails.title}</h2>
    </Link>
  )
}

export default ResumeCard