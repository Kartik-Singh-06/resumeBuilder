import { Button } from "@/Components/ui/button";
import Header from "@/Components/ui/Header/Header";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import ResumePreview from "@/Pages/Resume/[resumeId]/Resume_Details_Preview_Section/ResumePreview";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../Service/GlobalApi";
import { RWebShare } from "react-web-share";

const ViewResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();
  const getResumeInfo = () => {
    GlobalApi.getResumeById(resumeId).then((res) => {
      setResumeInfo(res?.data?.data);
      console.log(res.data.data);
    });
  };
  useEffect(() => {
    getResumeInfo();
  }, []);

  const download = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="text-area">
        <Header />
        <div className="m-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Resume is generated.👏
          </h2>
          <p className="text-center text-zinc-300">
            Now you are ready to download and share your resume URL to HR's and
            your friends.
          </p>
          <div className="flex justify-between px-44 my-8">
            <Button
              onClick={download}
              className="bg-[#007AFF] hover:bg-[#312ECB]"
            >
              Download
            </Button>

            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open url to see it",
                url: import.meta.env.VITE_BASE_URL + `/resume/${resumeId}/view`,
                title: resumeInfo?.firstName+" "+resumeInfo?.lastName+" resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button className="bg-[#007AFF] hover:bg-[#312ECB]">
                Share 🔗
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>

      <div id="resumePreview">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default ViewResume;
