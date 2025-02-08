import React, { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { SwatchBook } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../Service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function Theme() {
  const colors = [
    "#2EE8BB",
    "#FF6B6B",
    "#FFD700",
    "#A463F2",
    "#FF9F43",
    "#6C5CE7",
    "#00CEC9",
    "#FF7675",
    "#55EFC4",
    "#E84393",
    "#6C7A89",
    "#9CAF88",
    "#D4A6B3",
    "#B8B8B8",
    "#FFC09F",
    "#A2D5F2",
    "#7B8FA1",
    "#F4A261",
    "#6A0572",
    "#FF5A5F",
    "#D4B483",
    "#FF8C42",
    "#5E548E",
    "#F7CAC9",
    "#92A8D1",
    "#FF6F61",
    "#88B04B",
    "#B565A7",
    "#DD4124",
    "#EFC050",
    "#34568B",
    "#FFA07A",
    "#6B5B95",
    "#88B04B",
    "#955251",
    "#B565A7",
    "#DD4124",
    "#EFC050",
    "#34568B",
    "#FFA07A",
  ];
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { resumeId } = useParams();
  const onColorSelect = (color) => {
    setSelectedColor(color);
    setResumeInfo({
      ...resumeInfo,
      themeColor: color,
    });
    const data = {
      data: {
        themeColor: color,
      },
    };
    GlobalApi.updateResumeDetails(resumeId, data).then((resp) => {
      toast("Theme Color Updated");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex gap-2 bg-[#007AFF] hover:bg-[#312ECB]">
          <SwatchBook /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              onClick={() => onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor == item && "border border-black"}
             `}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Theme;
