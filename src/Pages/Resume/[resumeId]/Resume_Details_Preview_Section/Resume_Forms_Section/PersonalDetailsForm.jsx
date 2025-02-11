import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner"


const PersonalDetailsForm = ({ enableButton }) => {
  const param = useParams();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleChange = (e) => {
    // next button disabled
    enableButton(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // add data to resume info real-time
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // next button enabled
    enableButton(true);
    setLoading(true);
    const data = {
        data: formData,
    };
    GlobalApi.updateResumeDetails(param?.resumeId, data)
      .then((res) => {
        enableButton(true);
        setLoading(false);
        toast("Details updated")
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
  
  }, []);

  return (
    <div className="p-4 sm:p-6 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-6 sm:mt-10">
      <h2 className="font-bold text-lg sm:text-xl">Personal Details</h2>
      <p className="text-sm sm:text-base text-gray-600" >Get started with the basic personal informations.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm sm:text-base">First Name</label>
              <Input
                type="text"
                defaultValue={resumeInfo?.firstName}
                reqired
                onChange={handleChange}
                name="firstName"
                placeHolder="Eg. John..."
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm sm:text-base">Last Name</label>
              <Input
                type="text"
                defaultValue={resumeInfo?.lastName}
                reqired
                onChange={handleChange}
                name="lastName"
                placeHolder="Eg. Deo..."
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="text-sm sm:text-base">Job Title</label>
            <Input
              type="text"
              defaultValue={resumeInfo?.jobTitle}
              reqired
              onChange={handleChange}
              name="jobTitle"
              placeHolder="Eg. Frontend Developer..."
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm sm:text-base">Address</label>
            <Input
              type="text"
              defaultValue={resumeInfo?.address}
              reqired
              onChange={handleChange}
              name="address"
              placeHolder="Eg. hiTech city Delhi..."
              className="w-full"
            />
          </div>
          <div>
            <label className="text-sm sm:text-base">E-mail</label>
            <Input
              type="email"
              defaultValue={resumeInfo?.email}
              reqired
              onChange={handleChange}
              name="email"
              placeHolder="Eg. john@example.com"
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-sm sm:text-base">Phone Number</label>
              <Input
                type="number"
                defaultValue={resumeInfo?.phoneNumber}
                reqired
                onChange={handleChange}
                name="phoneNumber"
                placeHolder="Eg. (123)-342-2131"
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm sm:text-base">DateOfBirth</label>
              <Input
                type="date"
                defaultValue={resumeInfo?.dateOfBirth}
                reqired
                onChange={handleChange}
                name="dateOfBirth"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            className="bg-[#007AFF] hover:bg-[#312ECB] w-full sm:w-auto"
          >
            {loading ? <LoaderCircle className="animate-spin h-4 w-4 sm:h-5 sm:w-5 " /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
