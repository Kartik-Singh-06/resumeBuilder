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
      <div className="p-5 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skill Section</h2>
        <p className="text-sm">
          Skills & Proficiency: List key technical and soft skills relevant to
          your field, such as programming languages, frameworks, tools, and
          problem-solving abilities.
        </p>
        <div>
          {skillList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-10 items-center  border p-3 my-5 rounded-lg">
                <div>
                  <label className="mb-2">Name</label>
                  <Input
                    type="text"
                    defaultValue={item?.name}
                    placeholder="eg: JavaScript"
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

          <div className="flex justify-between gap-5">
            <div className="flex gap-3">
              <Button
                className="bg-transparent text-back border-2 hover:bg-zinc-200"
                onClick={() => addSkills()}
              >
                <span>
                  <Plus />
                </span>
                Add More Skills
              </Button>
              <Button
                className="bg-transparent text-back border-2 hover:bg-zinc-200"
                onClick={() => removeSkills()}
              >
                <span>
                  <Minus />
                </span>
                Remove Skills
              </Button>
            </div>

            <Button
              disabled={loading}
              onClick={() => handleSubmit()}
              className="bg-[#007AFF] hover:bg-[#312ECB]"
            >
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillForm;
