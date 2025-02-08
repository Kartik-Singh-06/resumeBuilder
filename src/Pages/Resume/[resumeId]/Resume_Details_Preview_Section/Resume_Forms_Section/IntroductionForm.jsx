import { Button } from "@/Components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import GlobalApi from "../../../../../../Service/GlobalApi";
import { Brain, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { chatSession } from "../../../../../../Service/AIModel";

const IntroductionForm = ({ enableButton }) => {
  const param = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [intro, setIntro] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genrateAItext, setGenerateAItext] = useState();

  console.log(genrateAItext);
  useEffect(() => {
    resumeInfo && setIntro(resumeInfo?.summary);
  }, []);

  const prompt =
    "Job Title: {jobTitle}, Depends on job title give me a introduction for my resume with in 4-5 lines in JSON format with feild experience level and summary with experience level for fresher-Level, Mid-level, Experience-level. please give me a array share in a single formate every time first level then its summary all keys in lower case";
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
    enableButton(false);
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
      data: {
        summary: intro,
      },
    };
    GlobalApi.updateResumeDetails(param?.resumeId, data)
      .then((res) => {
        enableButton(true);
        setLoading(false);
        toast("Details updated");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const generateAIIntro = async () => {
    try {
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
      const result = await chatSession.sendMessage(PROMPT);

      // console.log(JSON.parse(result.response.text()));
      setGenerateAItext(JSON.parse(result.response.text()));
    } catch (error) {
      console.error("Error generating AI introduction:", error);
    } finally {
      setLoading(false);
    }
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
          <Button
            variant="outline"
            onClick={() => generateAIIntro()}
            type="button"
            size="sm"
            className="border-primary text-primary flex gap-2"
          >
            <Brain className="h-4 w-4" /> Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5 h-[20vh]"
          defaultValue={intro}
          required
          onChange={handleInputChange}
        />
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
      {genrateAItext !== undefined && (
        <div className="mt-10">
          <h2 className="text-xl font-bold">
            AI Suggestions for Introduction:
          </h2>

          {generateAIIntro &&
            (genrateAItext?.introduction || genrateAItext?.introductions || genrateAItext?.experience_level).map(
              (item, index) => (
                <div key={index} className="p-4 border-b">
                  <h3 className="font-bold text-lg">
                    Level: {item?.experiencelevel || item?.experience_level || item?.level}
                  </h3>
                  <p>{item?.introduction || item?.summary}</p>
                </div>
              )
            )}
        </div>
      )}
    </div>
  );
};

export default IntroductionForm;
