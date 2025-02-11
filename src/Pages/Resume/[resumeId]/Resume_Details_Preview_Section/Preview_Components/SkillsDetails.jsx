import React from "react";

const SkillsDetails = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm sm:text-base mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Skills
      </h2>
      <hr
      className="border-t-2"
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        {resumeInfo?.skills?.map((skill, i) => (
          <div key={i} className="flex gap-2 items-center justify-between">
            <h2 className="font-semibold text-xs sm:text-sm text-zinc-700">
              {skill?.name}
            </h2>
            <div className="w-[100px] sm:w-[120px] h-2 bg-zinc-200 rounded-full">
              <div
                className="h-2 rounded-full"
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: skill?.rate * 20 + "%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDetails;
