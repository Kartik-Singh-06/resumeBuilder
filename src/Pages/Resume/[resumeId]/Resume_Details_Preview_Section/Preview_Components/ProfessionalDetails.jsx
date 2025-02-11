import React from "react";

const ProfessionalDetails = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm sm:text-base mb-2"
        style={{
          color: resumeInfo?.themeColor || "#007AFF",
        }}
      >
        Professional Details
      </h2>
      <hr
        className="border-t-2"
        style={{
          borderColor: resumeInfo?.themeColor || "#007AFF",
        }}
      />

      {resumeInfo?.experience?.map((exp, index) => (
        <div key={index} className="mt-4">
          <div className="flex justify-between items-center">
            <h5 className="font-semibold text-sm sm:text-base">{exp?.company}</h5>
            <h5 className="font-semibold text-zinc-600 text-xs sm:text-sm">
              {exp?.duration}
            </h5>
          </div>
          <h5 className="font-semibold text-zinc-500 text-sm sm:text-base mt-1">
            {exp?.role}
            <span className="text-xs sm:text-sm font-medium">{exp?.city}</span>
          </h5>
          <div
            className="text-xs sm:text-sm text-zinc-700 my-2"
            dangerouslySetInnerHTML={{ __html: exp?.workSummery }}
          />

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
