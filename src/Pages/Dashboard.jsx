import React, { useEffect, useState } from "react";
import AddResume from "./AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "../../Service/GlobalApi";
import ResumeCard from "./Resume/ResumeCard";

const Dashboard = () => {
  const { user } = useUser();
  const [userResumeList, setUserResumeList] = useState([]);

  const resumeList = () => {
    GlobalApi.userResume(user?.primaryEmailAddress?.emailAddress).then((res) => {
      setUserResumeList(res.data.data);
    });
  };

  useEffect(() => {
    resumeList();
  }, [user]);

  return (
    <div className="p-5 md:p-10 lg:px-20 xl:px-32">
      <h2 className="text-2xl md:text-3xl font-bold">My Resume</h2>
      <p className="w-full md:w-[50vw] mt-1 text-xs md:text-sm text-[#575757]">
        Create your resume effortlessly to showcase your skills, experience, and
        achievements. Start building a professional resume that stands out and
        helps you land your dream job.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        <AddResume />
        {userResumeList.length > 0 &&
          userResumeList.map((item, index) => (
            <ResumeCard 
              resumeDetails={item} 
              key={index} 
              refreshData={resumeList}
              className="min-w-[150px]" // Add minimum width for mobile
            />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;