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
    <div className="p-5 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic personal informations.</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <label>First Name</label>
              <Input
                type="text"
                defaultValue={resumeInfo?.firstName}
                reqired
                onChange={handleChange}
                name="firstName"
                placeHolder="Eg. John..."
              />
            </div>
            <div>
              <label>Last Name</label>
              <Input
                type="text"
                defaultValue={resumeInfo?.lastName}
                reqired
                onChange={handleChange}
                name="lastName"
                placeHolder="Eg. Deo..."
              />
            </div>
          </div>
          <div>
            <label>Job Title</label>
            <Input
              type="text"
              defaultValue={resumeInfo?.jobTitle}
              reqired
              onChange={handleChange}
              name="jobTitle"
              placeHolder="Eg. Frontend Developer..."
            />
          </div>
          <div>
            <label>Address</label>
            <Input
              type="text"
              defaultValue={resumeInfo?.address}
              reqired
              onChange={handleChange}
              name="address"
              placeHolder="Eg. hiTech city Delhi..."
            />
          </div>
          <div>
            <label>E-mail</label>
            <Input
              type="email"
              defaultValue={resumeInfo?.email}
              reqired
              onChange={handleChange}
              name="email"
              placeHolder="Eg. john@example.com"
            />
          </div>
          <div className="grid grid-cols-2 mt-5 gap-3">
            <div>
              <label>Phone Number</label>
              <Input
                type="number"
                defaultValue={resumeInfo?.phoneNumber}
                reqired
                onChange={handleChange}
                name="phoneNumber"
                placeHolder="Eg. (123)-342-2131"
              />
            </div>
            <div>
              <label>DateOfBirth</label>
              <Input
                type="date"
                defaultValue={resumeInfo?.dateOfBirth}
                reqired
                onChange={handleChange}
                name="dateOfBirth"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            disabled={loading}
            type="submit"
            className="bg-[#007AFF] hover:bg-[#312ECB]"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
