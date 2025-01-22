import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import RichTextEditor from "@/Pages/RichTextEditor";
import { Minus, Plus, Square } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

const formFields = {
  role: "",
  company: "",
  city: "",
  duration: "",
  responsibilities: "",
};
const ExperienceForm = () => {
  const [experienceList, setExperienceList] = useState([formFields]);

  const { ResumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, e) => {
    const newEnties = experienceList.slice();
    const { name, value } = e.target;
    newEnties[index][name] = value;
    setExperienceList(newEnties);
  };

  const AddNewExperience = () => {
    setExperienceList([...experienceList, formFields]);
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
    // setResumeInfo({
    //   ...ResumeInfo,
    //   experience: experienceList,
    // });
    console.log("experience list",experienceList)
  }, [experienceList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Experience Section</h2>
      <p>Share your experience</p>
      <div>
        {experienceList?.map((item, index) => (
          <div>
            <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              <div>
                <label className="text-xs">Position Title</label>
                <Input name="role" onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="company"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input name="city" onChange={(e) => handleChange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="text"
                  name="duration"
                  onChange={(e) => handleChange(index, e)}
                />
              </div>
            </div>
            <div className="mb-5 h-[20vh]">
              <RichTextEditor
                onTextEditorChange={(e) =>
                  onTextEditorChange(e, "responsibilities", index)
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between gap-5">
        <div className="flex gap-3">
          <Button
            className="bg-transparent text-back border-2 hover:bg-zinc-200"
            onClick={() => AddNewExperience()}
          >
            <span>
              <Plus />
            </span>
            Add more experience
          </Button>
          <Button
            className="bg-transparent text-back border-2 hover:bg-zinc-200"
            onClick={() => RemoveExperience()}
          >
            <span>
              <Minus />
            </span>{" "}
            Remove experience
          </Button>
        </div>

        <Button className="bg-[#007AFF] hover:bg-[#312ECB]">Next</Button>
      </div>
    </div>
  );
};

export default ExperienceForm;
