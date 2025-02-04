import React from "react";

const SkillsDetails = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Skills
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      <div className="grid grid-cols-3 mt-1">
        {resumeInfo?.skills?.map((skill,i) => (
          <div key={i} className="pt-2">
            <h2 className=" font-semibold text-xs text-zinc-700">
              {skill?.name}
              <div className="w-[120px] h-2 bg-zinc-200">
                <div className="h-2" style={{
                    backgroundColor : resumeInfo?.themeColor,
                    width : skill?.rate*20 + "%"
                }}
                ></div>
           
              </div>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsDetails;
