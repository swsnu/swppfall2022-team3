import React, { ChangeEvent, useCallback, useRef } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";


export interface IProps {
  index: number;
  src: string;
  setIthPhoto: (i: number, file: File) => void;
  removeIthPhoto: (i: number) => void;
  showDeleteButton?: boolean;
}

export default function ImageUploadIcon({
  index,
  src,
  setIthPhoto,
  removeIthPhoto,
  showDeleteButton = true,
}: IProps) {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const imageOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    const uploaded = inputFiles ? inputFiles[0] : null;

    if (uploaded) {
      setIthPhoto(index, uploaded);
    }
  }, [index, setIthPhoto]);

  const imageOnClick = useCallback(() => {
    uploadRef.current?.click();
  }, []);

  return (
    <div className={"relative w-fit h-fit flex flex-row"}>
      <input
        ref={uploadRef}
        className={"hidden"}
        placeholder={"photo"}
        type="file"
        accept="image/*"
        onChange={imageOnChange}
      />
      <button
        className={"w-fit h-fit"}
        onClick={imageOnClick}
      >
        <img
          className={"w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          src={src}
          alt=""
        />
      </button>
      {
        showDeleteButton ?
          (
            <button
              className={"absolute right-[-0.6rem] top-[-0.6rem] w-fit h-fit top-0 rounded-full shadow text-red-500 bg-white"}
              onClick={() => removeIthPhoto(index)}
            >
              <HighlightOffIcon/>
            </button>
          ) :
          null
      }
    </div>
  );
}
