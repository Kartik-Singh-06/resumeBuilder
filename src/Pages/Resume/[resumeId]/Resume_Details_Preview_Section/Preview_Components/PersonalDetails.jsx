import React from "react";
import { Link } from "react-router-dom";

const PersonalDetails = ({ resumeInfo }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center">
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h1>
      <h2 className="text-center text-base font-medium ">
        {resumeInfo?.jobTitle}
      </h2>
      <p className="text-center text-sm w-2/3 mx-auto text-zinc-700 ">
        {resumeInfo?.address}
      </p>
      <p className="text-center text-xs text-zinc-700 mb-2">
        {resumeInfo?.dateOfBirth}
      </p>
      <div className="flex justify-between border-b-[5px] pb-2 "style={{
   borderColor : resumeInfo?.themeColor,
   color : resumeInfo?.themeColor
      }}>
      <p className="text-center text-xs text-zinc-700" >{resumeInfo?.phoneNumber}</p>
      <p className="text-center text-xs text-zinc-700">{resumeInfo?.email}</p>
      </div>
      

      {/* Social Links */}
      {/* <ul className="text-start text-sm mt-2">
        <h5>Social Links :</h5>
          <ul className="flex gap-3">
          {resumeInfo?.socialLinks.map((item, index) => (
          <div key={index}>
            <Link to={item?.link}>{item?.name} </Link>
          </div>
        ))}
          </ul>
      </ul> */}
    </div>
  );
};

export default PersonalDetails;
