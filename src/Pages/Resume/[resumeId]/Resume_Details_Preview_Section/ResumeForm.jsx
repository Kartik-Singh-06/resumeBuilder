import React, { useState } from "react";
import PersonalDetailsForm from "./Resume_Forms_Section/PersonalDetailsForm";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, ArrowRight, HomeIcon, SwatchBook } from "lucide-react";
import IntroductionForm from "./Resume_Forms_Section/IntroductionForm";
import ExperienceForm from "./Resume_Forms_Section/ExperienceForm";
import EducationForm from "./Resume_Forms_Section/EducationForm";
import Experience from "./Resume_Forms_Section/ExperienceForm";
import SkillForm from "./Resume_Forms_Section/SkillFrom";
import { Link, Navigate, useParams } from "react-router-dom";
import ViewResume from "@/MyResume/[resumeId]/ViewResume";
import Theme from "../../Theme/Theme";

const ResumeForm = () => {
  const [activeFormPage, setActiveFormPage] = useState(1); //for tracking form-pages
  const [enableButton, setEnableButton] = useState(false);
  const {resumeId} = useParams()
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3">
          <Link to={"/dashboard"}>
            <Button className="bg-[#007AFF] hover:bg-[#312ECB]">
              <HomeIcon />
            </Button>
          </Link>
          <Theme/>
        </div>
        <div className="flex gap-2">
          {/* page is greater then 1 then it will show back button */}
          {activeFormPage > 1 && (
            <Button
              className="flex gap-2 bg-[#007AFF] hover:bg-[#312ECB]"
              onClick={() => setActiveFormPage(activeFormPage - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableButton}
            className="flex gap-2 bg-[#007AFF] hover:bg-[#312ECB]"
            onClick={() => setActiveFormPage(activeFormPage + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal details  Active page 1 then it will show 1 personal detail form.*/}
      {activeFormPage == 1 ? (
        <PersonalDetailsForm enableButton={(val) => setEnableButton(val)} />
      ) : activeFormPage == 2 ? (
        <IntroductionForm enableButton={(val) => setEnableButton(val)} />
      ) : activeFormPage == 3 ? (
        <Experience enableButton={(val) => setEnableButton(val)} />
      ) : activeFormPage == 4 ? (
        <EducationForm enableButton={(val) => setEnableButton(val)} />
      ) : activeFormPage == 5 ? (
        <SkillForm enableButton={(val) => setEnableButton(val)} />
      ) : activeFormPage == 6 ? (
        <Navigate to={`/resume/${resumeId}/view`}/>
      ) : null}
    </div>
  );
};

export default ResumeForm;
