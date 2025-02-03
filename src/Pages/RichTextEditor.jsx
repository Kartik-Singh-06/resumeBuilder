import { Button } from "@/Components/ui/button";
import { ResumeInfoContext } from "@/Context/ResumeInfoContext";
import { BrainCircuit, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";

import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { chatSession } from "../../Service/AIModel";
import { toast } from "sonner";

const RichTextEditor = ({ onTextEditorChange, index }) => {
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const PROMPT = `position title : {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume in HTML format.`;
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const generateFromAi = async () => {
    setLoading(true);
    if (!resumeInfo.experience[index].role) {
      toast("Please add a role to your resume");
      return;
    }
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].role
    );
    const result = await chatSession.sendMessage(prompt);
    const responseText = await result.response.text();
    const parsedResponse = responseText;   
    setValue(parsedResponse.replace('[',"").replace(']',""));
    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-end">
        <Button
          type="button"
          onClick={() => generateFromAi()}
          className="bg-transparent outline-1 shadow-md mb-3 text-[#007AFF] hover:bg-[#f5f4f4]"
        >
          <BrainCircuit></BrainCircuit>
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            "Generate Summary from AI"
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onTextEditorChange(e);
          }}
          className="h-[15vh] overflow-y-auto"
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnStrikeThrough />
            <BtnUnderline />
            <Separator />
            <BtnRedo />
            <BtnUndo />
            <BtnNumberedList />
            <BtnBulletList />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </>
  );
};

export default RichTextEditor;
