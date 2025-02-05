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
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
      <div className="grid grid-cols-2 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <ResumeForm />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
