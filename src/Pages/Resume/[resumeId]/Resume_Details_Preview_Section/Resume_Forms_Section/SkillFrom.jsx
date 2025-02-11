import { Input } from "@/Components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/Components/ui/button";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";


const SkillForm = () => {
  const {resumeId} = useParams();
  const [skillList, setSkillList] = useState([{ name: "", rate: 0 }]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, name, value) => {
    const newEntries = skillList.slice();
    newEntries[index][name] = value;
    setSkillList(newEntries);
  };

  const addSkills = () => {
    setSkillList([...skillList, { name: "", rate: 0 }]);
  };

  const removeSkills = () => {
    setSkillList((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      data: {
        skills: skillList,
      },
    };
    console.log("Sending data:", JSON.stringify(data, null, 2)); // Debugging

    GlobalApi.updateResumeDetails(resumeId, data)
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

  useEffect(() => {
    setResumeInfo({
        ...resumeInfo,
      skills: skillList,
    });
  }, [skillList]);


  useEffect(() => {
      resumeInfo && setSkillList(resumeInfo?.skills);
    }, []);

  return (
    <div>
      <div className="p-4 sm:p-6 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-6 sm:mt-10">
        <h2 className="font-bold text-lg sm:text-xl">Skill Section</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Skills & Proficiency: List key technical and soft skills relevant to
          your field, such as programming languages, frameworks, tools, and
          problem-solving abilities.
        </p>
        <div>
          {skillList.map((item, index) => (
            <div key={index} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center border p-3 sm:p-4 my-4 rounded-lg">
                <div>
                  <label className="text-xs sm:text-sm">Name</label>
                  <Input
                    type="text"
                    defaultValue={item?.name}
                    placeholder="eg: JavaScript"
                    className="w-full"
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div className="justify-self-end">
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={item.rate}
                    onChange={(v) => handleChange(index, "rate", v)}
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 mt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                className="bg-transparent text-back border-2 hover:bg-zinc-200 w-full sm:w-auto"
                onClick={() => addSkills()}
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-2">
                Add More Skills
                </span>
              </Button>
              <Button
                className="bg-transparent text-back border-2 hover:bg-zinc-200 w-full sm:w-auto"
                onClick={() => removeSkills()}
              >
                  <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="ml-2">
                Remove Skills
                </span>
              </Button>
            </div>

            <Button
              disabled={loading}
              onClick={() => handleSubmit()}
              className="bg-[#007AFF] hover:bg-[#312ECB] w-full sm:w-auto"
            >
              {loading ? <LoaderCircle className="animate-spin h-4 w-4 sm:h-5 sm:w-5" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillForm;
