import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResumeForm from "./Resume_Details_Preview_Section/ResumeForm";
import ResumePreview from "./Resume_Details_Preview_Section/ResumePreview";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import dummyData from  "../../../Data/DummyData"
import GlobalApi from "../../../../Service/GlobalApi";

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState()
  const param = useParams();
  useEffect(() => {
    getResumeInfo()
  }, []);

 const getResumeInfo =()=>{
  GlobalApi.getResumeById(param?.resumeId).then(res =>{
    console.log(res.data.data);
    setResumeInfo(res.data.data)
  })
 }
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="p-5 sm:p-10">
        {/* Preview Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <ResumeForm />
          </div>

          {/* Preview Section */}
          <div className="order-1 lg:order-2">
            <ResumePreview />
          </div>
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
