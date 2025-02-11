import React from "react";
import { Link } from "react-router-dom";

const PersonalDetails = ({ resumeInfo }) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-center">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <h2 className="text-center text-sm sm:text-base font-medium mt-1">
        {resumeInfo?.jobTitle}
      </h2>
      <p className="text-center text-xs sm:text-sm text-zinc-700 w-full sm:w-2/3 mx-auto mt-2">
        {resumeInfo?.address}
      </p>
      <p className="text-center text-xs text-zinc-700 mt-1">
        {resumeInfo?.dateOfBirth}
      </p>
      <div
        className="flex flex-col sm:flex-row justify-between items-center border-b-[3px] sm:border-b-[5px] pb-2 mt-3"
        style={{
          borderColor: resumeInfo?.themeColor,
          color: resumeInfo?.themeColor,
        }}
      >
        <p className="text-center text-xs text-zinc-700">
          {resumeInfo?.phoneNumber}
        </p>
        <p className="text-center text-xs text-zinc-700 mt-1 sm:mt-0">{resumeInfo?.email}</p>
      </div>
    </div>
  );
};

export default PersonalDetails;
