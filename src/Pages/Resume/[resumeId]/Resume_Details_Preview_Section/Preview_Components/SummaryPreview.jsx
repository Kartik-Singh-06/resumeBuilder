import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    // <p className='mt-2 md:mt-3 text-sm sm:text-md  text-zinc-800 px-2 md:px-6'>
    //     {resumeInfo?.summary}
    // </p>

    <div className="mt-4">
    <p className="text-xs sm:text-sm text-zinc-800 leading-5 sm:leading-6">
      {resumeInfo?.summary || "Add a professional summary to highlight your skills and experience."}
    </p>
  </div>
  )
}

export default SummaryPreview