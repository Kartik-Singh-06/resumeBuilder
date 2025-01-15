import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import GlobalApi from "../../Service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const AddResume = () => {
  const [toggleDialog, setToggleDialog] = useState(false);
  const [resumeTitle, setresumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onCreate = async () => {
    setLoading(true);
    const uID = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uID,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };

    try {
      const response = await GlobalApi.CreateNewResume(data);   
      setLoading(false);
      navigate(`/dashboard/resume/${response.data.data.documentId}/edit`)
      setToggleDialog(false); // Close dialog after success
    } catch (error) {
      console.error("Error creating resume:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="w-[12vw] h-[30vh] border-dashed border-2 border-[#b0afaf] rounded-md cursor-pointer flex justify-center items-center bg-[#e8e8e8] hover:scale-105 transition-all hover:shadow-lg"
        onClick={() => setToggleDialog(true)}
      >
        <PlusSquare />
      </div>

      <AlertDialog open={toggleDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create New Resume</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="mb-2">Add title for your resume</p>
              <Input
                type="text"
                placeholder="Ex. Frontend Developer..."
                onChange={(e) => setresumeTitle(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              onClick={() => setToggleDialog(false)}
              className="bg-[#007AFF] hover:bg-[#312ECB]"
            >
              Cancel
            </Button>
            <Button
              disabled={!resumeTitle || loading}
              onClick={onCreate}
              className="bg-[#007AFF] hover:bg-[#312ECB]"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddResume;
