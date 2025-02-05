import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCard = ({resumeDetails}) => {
  return (
    <Link to={`/dashboard/resume/${resumeDetails.documentId}/edit`}>
      <div className='w-[12vw] h-[30vh] rounded-md cursor-pointer flex justify-center items-center bg-gradient-to-b from-sky-300 to-indigo-200 hover:scale-105 transition-all hover:shadow-lg mb-2'>
         <img className='w-24 ' src="https://img.icons8.com/?size=100&id=115648&format=png&color=000000" alt="" />
      </div>
      <h2 className='text-sm font-medium text-[#545353]'>{resumeDetails.title}</h2>
    </Link>
  )
}

export default ResumeCard