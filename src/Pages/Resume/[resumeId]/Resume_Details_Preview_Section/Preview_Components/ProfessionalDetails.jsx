import React from "react";

const ProfessionalDetails = ({ resumeInfo }) => {

  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Details
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.experience.map((exp, index) => (
        <div key={index} className="mt-2">
          <div className="flex justify-between">
            <h5 className="font-semibold">{exp?.company}</h5>
            <h5 className="font-semibold text-zinc-600 text-xs">
              {exp?.duration}
            </h5>
          </div>
          <h5 className="font-semibold text-zinc-500">{exp?.role} - <span className="text-xs font-medium">{exp?.city}</span></h5>
          <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:exp?.workSummery}} />
          
          {/* <ul className="text-sm">
            {exp?.responsibilities?.map((responsibility, index) => (
              <li key={index} className="list-disc ml-5">{responsibility}</li>
            ))}
          </ul> */}
        </div>
      ))}
    </div>
  );
};

export default ProfessionalDetails;
