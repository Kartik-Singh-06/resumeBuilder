import React from "react";

const EducationDetails = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm sm:text-base mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education Details
      </h2>
      <hr
       className="border-t-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.education?.map((exp, index) => (
        <div key={index} className="mt-4">
          <div className="flex justify-between items-center text-sm">
            <h5 className="font-semibold text-sm sm:text-base">{exp?.degree}</h5>
            <h5 className="font-semibold text-zinc-600 text-xs sm:text-sm">
              {exp?.graduationYear}
            </h5>
          </div>
          <h5 className="font-semibold text-zinc-500 text-xs sm:text-sm mt-1">
            {exp?.institution} - <span className="text-xs sm:text-sm">{exp?.city}</span>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default EducationDetails;
