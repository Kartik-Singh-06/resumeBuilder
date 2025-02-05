import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { toast } from "sonner";

const educationFields = {
  institution: "",
  degree: " ",
  city: "",
  graduationYear: "",
};
const EducationForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [educationList, setEducationList] = useState([educationFields]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const handleChange = (e, index) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

 useEffect(()=>{
  resumeInfo&& setEducationList(resumeInfo?.education );
 },[])


  const addEducationFields = () => {
    setEducationList([...educationList, { ...educationFields }]);
  };
  const removeEducationFields = () => {
    setEducationList((prev) => prev.slice(0, -1));
  };
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({id,...rest})=> rest),
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
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education Section</h2>
        <p className="text-sm">
          Degree & Institution: Mention your degree (e.g., B.Tech in Computer
          Science) and the university/college you attended.
        </p>

        <div>
          {educationList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label>Course Name</label>
                  <Input
                    type="text"
                    name="degree"
                    defaultValue={item?.degree}
                    placeholder="eg: Bachelor in Computer Science"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Institution Name</label>
                  <Input
                    type="text"
                    name="institution"
                    defaultValue={item?.institution}
                    placeholder="eg: Boston University"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>City</label>
                  <Input
                    type="text"
                    name="city"
                    defaultValue={item?.city}
                    placeholder="eg: Boston"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label>Greaduate Year</label>
                  <Input
                    type="text"
                    name="graduationYear"
                    defaultValue={item?.graduationYear}
                    placeholder="eg: 2018"
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex gap-3">
            <Button
              className="bg-transparent text-back border-2 hover:bg-zinc-200"
              onClick={() => addEducationFields()}
            >
              <span>
                <Plus />
              </span>
              Add More Field
            </Button>
            <Button
              className="bg-transparent text-back border-2 hover:bg-zinc-200"
              onClick={() => removeEducationFields()}
            >
              <span>
                <Minus />
              </span>
              Remove Field
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
  );
};

export default EducationForm;
