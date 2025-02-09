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
  const { resumeId } = useParams();
  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 sm:gap-3">
          <Link to={"/dashboard"}>
            <Button className="bg-[#007AFF] hover:bg-[#312ECB] p-2 sm:p-3">
              <HomeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </Link>
          <Theme />
        </div>
        <div className="flex gap-2 sm:gap-3">
          {/* page is greater then 1 then it will show back button */}
          {activeFormPage > 1 && (
            <Button
              className="flex gap-2 bg-[#007AFF] hover:bg-[#312ECB] p-2 sm:p-3"
              onClick={() => setActiveFormPage(activeFormPage - 1)}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
          <Button
            disabled={!enableButton}
            className="flex gap-2 bg-[#007AFF] hover:bg-[#312ECB] p-2 sm:p-3"
            onClick={() => setActiveFormPage(activeFormPage + 1)}
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
      {/* personal details  Active page 1 then it will show 1 personal detail form.*/}
      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
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
          <Navigate to={`/resume/${resumeId}/view`} />
        ) : null}
      </div>
    </div>
  );
};

export default ResumeForm;
