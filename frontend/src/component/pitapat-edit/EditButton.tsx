import React, { Dispatch, SetStateAction } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";


export interface IProps {
  setOption: Dispatch<SetStateAction<boolean>>;
}

export default function EditButton({setOption}: IProps) {
  const iconClassName = "text-pink-500 h-8 w-8 mx-2";

  return (
    <button
      className={iconClassName}
      onClick={() => setOption(true)}
    >
      <ModeEditOutlineOutlinedIcon fontSize="medium" />
    </button>
  );
}
