import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import RichTextEditor from "@/Pages/RichTextEditor";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const formFields = {
  role: "",
  company: "",
  city: "",
  duration: "",
  workSummery: "",
};
const Experience = () => {
  const [loading, setLoading] = useState(false);
  const [experienceList, setExperienceList] = useState([{...formFields}]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  useEffect(() => {
    // resumeInfo && setExperienceList(resumeInfo?.experience);
    const experiences = resumeInfo?.experience
    if(Array.isArray(experiences)){
      setExperienceList(experiences)
    }else{
      setExperienceList([{...formFields}])
    }
    
  }, []);

  const handleChange = (index, e) => {
    const newEntries = experienceList.map((entry, i) =>
      i === index ? { ...entry, [e.target.name]: e.target.value } : entry
    );
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      { role: "", company: "", city: "", duration: "", workSummery: "" },
    ]);
  };
  const RemoveExperience = () => {
    setExperienceList((prev) => prev.slice(0, -1));
  };

  const onTextEditorChange = (e, name, index) => {
    const newEnties = experienceList.slice();
    newEnties[index][name] = e.target.value;
    setExperienceList(newEnties);
  };

  useEffect(() => {
    setResumeInfo((prevResumeInfo) => ({
      ...prevResumeInfo,
      experience: experienceList,
    }));
  }, [experienceList, setResumeInfo]);

  const handleSubmit = () => {
    setLoading(true);

    if (!params?.resumeId) {
      console.error("resumeId is undefined");
      setLoading(false);
      toast("Failed to update details. Missing resumeId.");
      return;
    }
    const data = {
      data: {
        experience: experienceList.map((item) => ({
          role: item.role,
          company: item.company,
          city: item.city,
          duration: item.duration,
          workSummery: item.workSummery,
        })),
      },
    };

    GlobalApi.updateResumeDetails(params?.resumeId, data)
      .then((res) => {
        console.log("API Response:", res);
        setLoading(false);
        toast("Details updated!");
      })
      .catch((error) => {
        console.error("API Error:", error.response?.data || error.message);
        setLoading(false);
        toast("Failed to update details. Please try again.");
      });
  };

  return (
    <div className="p-4 sm:p-6 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-6 sm:mt-10">
      <h2 className="font-bold text-lg sm:text-xl">Experience Section</h2>
      <p className="text-sm sm:text-base text-gray-600">Share your experience</p>

      <div>
        {experienceList?.map((item, index) => (
          <div key={index} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border p-3 sm:p-4 my-4 rounded-lg">
              <div>
                <label className="text-xs sm:text-sm">Position Title</label>
                <Input
                  name="role"
                  placeholder="eg: Cloud Engg."
                  defaultValue={item?.role}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm">Company Name</label>
                <Input
                  name="company"
                  placeholder="eg: XYZ solutions"
                  defaultValue={item?.company}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm">City</label>
                <Input
                  name="city"
                  placeholder="eg: New York"
                  defaultValue={item?.city}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </div>
              <div>
                <label className="text-xs sm:text-sm">Duration</label>
                <Input
                  type="text"
                  placeholder="eg: 2012-present"
                  name="duration"
                  defaultValue={item?.duration}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full"
                />
              </div>
            </div>
            <div className="mb-5 h-[150px] sm:h-[200px]">
              <RichTextEditor
                index={index}
                defaultValue={item?.workSummery}
                onTextEditorChange={(e) =>
                  onTextEditorChange(e, "workSummery", index)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 mt-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-transparent text-back border-2 hover:bg-zinc-200 w-full sm:w-auto"
            onClick={() => AddNewExperience()}
          >
            <span>
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="ml-2">Add more experience</span>
          </Button>
          <Button
            className="bg-transparent text-back border-2 hover:bg-zinc-200 w-full sm:w-auto"
            onClick={() => RemoveExperience()}
          >
            <span>
            <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>{" "}
            <span className="ml-2">Remove experience</span>
          </Button>
        </div>

        <Button
          disabled={loading}
          onClick={() => handleSubmit()}
          className="bg-[#007AFF] hover:bg-[#312ECB] w-full sm:w-auto"
        >
          {loading ? <LoaderCircle className="animate-spin  h-4 w-4 sm:h-5 sm:w-5" /> : "Save"}
        </Button>
      </div>
    </div>
  );
};

export default Experience;
