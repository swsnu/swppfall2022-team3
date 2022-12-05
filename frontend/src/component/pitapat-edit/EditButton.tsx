import React, { Dispatch, SetStateAction } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";


export interface IProps {
  option: number;
  setOption: Dispatch<SetStateAction<number>>;
}

export default function EditButton({option, setOption}: IProps) {
  const iconClassName = "text-pink-500 h-8 w-8 mx-2";

  return (
    <button
      className={iconClassName}
      onClick={() => setOption(option)}
    >
      <ModeEditOutlineOutlinedIcon fontSize="medium" />
    </button>
  );
}
