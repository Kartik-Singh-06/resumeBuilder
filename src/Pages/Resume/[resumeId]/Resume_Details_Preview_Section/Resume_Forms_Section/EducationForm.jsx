import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import { LoaderCircle, Minus, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { toast } from "sonner";

const EducationForm = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [educationList, setEducationList] = useState([
    { institution: "", degree: "", city: "", graduationYear: "" },
  ]);

  useEffect(() => {
    resumeInfo && setEducationList(resumeInfo?.education);
  }, []);

  const handleChange = (e, index) => {
    const newEntries = educationList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    setEducationList(newEntries);
  };

  const addEducationFields = () => {
    setEducationList([
      ...educationList,
      {
        institution: "",
        degree: " ",
        city: "",
        graduationYear: "",
      },
    ]);
  };
  const removeEducationFields = () => {
    setEducationList((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    setLoading(true);
    const data = {
      data: {
        education: educationList.map(({ id, ...rest }) => rest),
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

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationList,
    });
  }, [educationList]);

  return (
    <div>
      <div className="p-4 sm:p-6 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-6 sm:mt-10">
        <h2 className="font-bold text-lg sm:text-xl">Education Section</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Degree & Institution: Mention your degree (e.g., B.Tech in Computer
          Science) and the university/college you attended.
        </p>

        <div>
          {educationList?.map((item, index) => (
            <div key={index} className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border p-3 sm:p-4 my-4 rounded-lg">
                <div>
                  <label className="text-xs sm:text-sm" >Course Name</label>
                  <Input
                    type="text"
                    name="degree"
                    defaultValue={item?.degree}
                    placeholder="eg: Bachelor in Computer Science"
                    onChange={(e) => handleChange(e, index)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm">Institution Name</label>
                  <Input
                    type="text"
                    name="institution"
                    defaultValue={item?.institution}
                    placeholder="eg: Boston University"
                    onChange={(e) => handleChange(e, index)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm">City</label>
                  <Input
                    type="text"
                    name="city"
                    defaultValue={item?.city}
                    placeholder="eg: Boston"
                    onChange={(e) => handleChange(e, index)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm">Greaduate Year</label>
                  <Input
                    type="text"
                    defaultValue={item?.graduationYear}
                    name="graduationYear"
                    placeholder="eg: 2018"
                    onChange={(e) => handleChange(e, index)}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-5 mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="bg-transparent text-back border-2 hover:bg-zinc-200 w-full sm:w-auto"
              onClick={() => addEducationFields()}
            >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5"  />
              <span className="ml-2">
              Add More Field
              </span>
            </Button>
            <Button
              className="bg-transparent text-back border-2 hover:bg-zinc-200 w-full sm:w-auto"
              onClick={() => removeEducationFields()}
            >
              
              <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="ml-2">Remove Field</span>
            </Button>
          </div>

          <Button
            disabled={loading}
            onClick={() => handleSubmit()}
            className="bg-[#007AFF] hover:bg-[#312ECB] w-full sm:w-auto"
          >
            {loading ? <LoaderCircle className="animate-spin h-4 w-4 sm:h-5 sm:w-5 " /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;
