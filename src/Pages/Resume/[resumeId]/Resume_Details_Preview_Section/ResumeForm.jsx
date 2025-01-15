import React, { useState } from "react";
import PersonalDetailsForm from "./Resume_Forms_Section/PersonalDetailsForm";
import { Button } from "@/Components/ui/button";
import { ArrowLeft, ArrowRight, SwatchBook } from "lucide-react";

const ResumeForm = () => {
  const [activeFormPage, setActiveFormPage] = useState(1);//for tracking form-pages 
  const [enableButton, setEnableButton] = useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <Button className="flex gap-2 bg-[#007AFF] hover:bg-[#312ECB]">
          <SwatchBook /> Theme
        </Button>
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
      {activeFormPage === 1 ? (
        <PersonalDetailsForm enableButton={(val) => setEnableButton(val)} />
      ) : null}
      {/* summary */}

      {/* professional details */}

      {/* educational details */}

      {/*skills  */}
    </div>
  );
};

export default ResumeForm;
