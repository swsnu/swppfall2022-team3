import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import style from "../../constant/style";


interface IProps {
  tagName: string;
  included?: boolean;
  onDelete: (() => void) | null;
}

export default function TagElement({
  tagName,
  included,
  onDelete,
}: IProps) {
  return (
    <article
      className={included === false ? "relative w-fit px-2.5 py-0.5 my-1 mx-2 rounded-2xl border-2 border-blue-500 text-blue-500"
        : `relative w-fit px-2.5 py-0.5 my-1 mx-2 rounded-2xl border-2 border-${style.color.main} text-${style.color.main}`}
    >
      {included === true ? "+ " : included === false ? "- " : ""}
      {tagName}
      {
        onDelete ?
          (
            <button
              className={"absolute right-[-0.8rem] top-[-0.6rem] w-fit h-fit top-0 rounded-full bg-white"}
              onClick={onDelete}
            >
              <HighlightOffIcon/>
            </button>
          ) :
          null
      }
    </article>
  );
}
