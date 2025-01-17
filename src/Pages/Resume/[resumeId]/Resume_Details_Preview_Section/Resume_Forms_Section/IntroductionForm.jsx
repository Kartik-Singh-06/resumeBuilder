import { Button } from "@/Components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
const IntroductionForm = ({ enableButton }) => {
  const param = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [intro, setIntro] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(param)
  useEffect(() => {
    const timer = setTimeout(() => {
      intro &&
        setResumeInfo({
          ...resumeInfo,
          summary: intro,
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [intro]);

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (value.length > 500) {
      setError("Introduction must be less than 500 characters");
    } else {
      setError(null);
      setIntro(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    enableButton(true);
    setLoading(true);
    const data = {
       data:{
        summary : intro
       }
    }
    GlobalApi.updateResumeDetails(param?.resumeId, data).then((res) => {
        console.log(res);
        enableButton(true);
        setLoading(false);
        toast("Details updated");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-[#007AFF] border-t-4 mt-10">
      <h2 className="font-bold text-lg">Introduction Section</h2>
      <p>Write here about yourself ? </p>

      <form onSubmit={handleSubmit} className="mt-7">
        <div className="flex justify-between items-end">
          <label className="font-semibold text-zinc-700">
            Add Introduction
          </label>
          <Button className="bg-transparent outline-1 shadow-md text-[#007AFF] hover:bg-white">
            Generate from AI
          </Button>
        </div>
        <Textarea className="mt-5 h-[20vh]" required onChange={handleInputChange} />
        {error && <p className="text-red-500 mt-2">{error}</p>}
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

export default IntroductionForm;
