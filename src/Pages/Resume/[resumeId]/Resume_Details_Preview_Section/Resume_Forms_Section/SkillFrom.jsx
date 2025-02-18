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
  const { resumeId } = useParams();
  const [skillList, setSkillList] = useState([{ name: "", rate: 0 }]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (index, name, value) => {
    const newEntries = [...skillList];
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
    const isValid = skillList.every(skill => 
      skill.name.trim() !== "" && skill.rate > 0
    );
    
    if (!isValid) {
      toast.error("Please fill all skill names and set valid ratings (1-5)");
      return;
    }

    setLoading(true);
    const data = {
      data: {
        skills: skillList.map(skill => ({
          name: skill.name.trim(),
          rate: Math.max(1, Math.min(skill.rate, 5)) 
        }))
      },
    };

    GlobalApi.updateResumeDetails(resumeId, data)
      .then((res) => {
        setLoading(false);
        toast.success("Details updated successfully!");
        setResumeInfo(prev => ({ ...prev, skills: data.data.skills }));
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
        toast.error("Failed to update details. Please try again.");
      });
  };

  // Initialize form with context data
  useEffect(() => {
    if (resumeInfo?.skills?.length > 0) {
      setSkillList(resumeInfo.skills);
    } else {
      setSkillList([{ name: "", rate: 0 }]);
    }
  }, [resumeInfo]);

  return (
    <div className="p-4 sm:p-6 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-6 sm:mt-10">
      <h2 className="font-bold text-lg sm:text-xl">Skill Section</h2>
      <p className="text-sm sm:text-base text-gray-600 mt-2">
        Skills & Proficiency: List key technical and soft skills relevant to
        your field.
      </p>

      <div className="mt-6">
        {skillList.map((item, index) => (
          <div key={index} className="border p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Skill Name
                </label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handleChange(index, "name", e.target.value)
                  }
                  placeholder="e.g., JavaScript"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Proficiency
                </label>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={item.rate}
                  onChange={(v) => handleChange(index, "rate", v)}
                  items={5}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={addSkills}
              className="flex-1 sm:flex-none"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Skill
            </Button>
            <Button
              variant="outline"
              onClick={removeSkills}
              disabled={skillList.length <= 1}
              className="flex-1 sm:flex-none"
            >
              <Minus className="mr-2 h-4 w-4" /> Remove
            </Button>
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#007AFF] hover:bg-[#0066CC] ml-auto"
          >
            {loading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillForm;
