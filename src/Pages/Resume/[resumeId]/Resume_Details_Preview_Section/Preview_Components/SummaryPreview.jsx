import React from 'react'

const SummaryPreview = ({resumeInfo}) => {
  return (
    <p className='mt-1 text-sm text-zinc-800'>
        {resumeInfo?.summary}
    </p>
  )
}

export default SummaryPreview