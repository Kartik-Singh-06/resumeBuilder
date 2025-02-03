import React from "react";

const EducationDetails = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Education Details
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.education?.map((exp, index) => (
        <div key={index} className="mt-2">
          <div className="flex justify-between text-sm">
            <h5 className="font-semibold">{exp?.degree}</h5>
            <h5 className="font-semibold text-zinc-600 text-xs">
              {exp?.graduationYear}
            </h5>
          </div>
          <h5 className="font-semibold text-zinc-500 text-xs">
            {exp?.institution} - <span className="text-xs ">{exp?.city}</span>
          </h5>
        </div>
      ))}
    </div>
  );
};

export default EducationDetails;
