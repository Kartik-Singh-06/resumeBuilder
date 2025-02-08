import { LoaderIcon, MoreVertical, Notebook } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import GlobalApi from "../../../Service/GlobalApi";
import { toast } from "sonner";

const ResumeCard = ({ resume, resumeDetails, refreshData }) => {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const onDelete = () => {
    setLoading(true);
    GlobalApi.deleteResumeById(resumeDetails?.documentId).then(
      (res) => {
        toast("Resume deleted");
        refreshData();
        setOpenAlert(false);
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        toast("Error deleting resume");
      }
    );
  };

  return (
    <div className="w-full sm:w-[150px] md:w-[12vw]">
      <Link to={`/dashboard/resume/${resumeDetails?.documentId}/edit`}>
        <div className="w-full h-[150px] sm:h-[200px] md:h-[30vh] rounded-md cursor-pointer flex justify-center items-center bg-gradient-to-b from-sky-300 to-indigo-200 hover:scale-105 transition-all hover:shadow-lg mb-2">
          <img
            className="w-16 sm:w-20 md:w-24"
            src="https://img.icons8.com/?size=100&id=115648&format=png&color=000000"
            alt=""
          />
        </div>
      </Link>
      <div className="flex justify-between items-center">
      <h2 className="text-sm font-medium truncate text-[#545353]">
          {resumeDetails.title}
        </h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation(
                  "/dashboard/resume/" + resumeDetails?.documentId + "/edit"
                )
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/resume/" + resumeDetails?.documentId + "/view")
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                navigation("/resume/" + resumeDetails?.documentId + "/view")
              }
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDelete}
                disabled={loading}
                className="bg-[#007AFF] hover:bg-[#312ECB]"
              >
                {loading ? <LoaderIcon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default ResumeCard;
