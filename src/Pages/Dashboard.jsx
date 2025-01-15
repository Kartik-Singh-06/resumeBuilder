import React, { useEffect,useState } from "react";
import AddResume from "./AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../Service/GlobalApi";
import ResumeCard from "./Resume/ResumeCard";

const Dashboard = () => {
  const { user } = useUser();
  const [userResumeList , setUserResumeList] = useState([])

  const resumeList = () => {
    GlobalApi.userResume(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        setUserResumeList(res.data.data)
      }
    );
  };


  useEffect(()=>{
    resumeList()
  },[user])

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="text-3xl font-bold">My Resume</h2>
      <p className="w-[50vw] mt-1 text-sm text-[#575757] ">
        Create your resume effortlessly to showcase your skills, experience, and
        achievements. Start building a professional resume that stands out and
        helps you land your dream job.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-12 ">
        <AddResume />
        {
          userResumeList.length>0 && userResumeList.map((item,index)=>(
            <ResumeCard resumeDetails={item} key={index}/>
          ))
        }
      </div>
    </div>
  );
};

export default Dashboard;
