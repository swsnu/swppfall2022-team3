import React, { ChangeEvent, useCallback, useRef, useState } from "react";


interface IProps {
  index: number;
  setIthPhoto: (i: number, file: File) => void;
}

export default function ImageUploadIcon({
  index,
  setIthPhoto,
}: IProps) {
  const [src, setSrc] = useState<string>("plus.jpeg");
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const imageOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = event.target.files;
    const uploaded = inputFiles ? inputFiles[0] : null;

    if (uploaded) {
      setSrc(URL.createObjectURL(uploaded));
      setIthPhoto(index, uploaded);
    }
  }, [index, setSrc, setIthPhoto]);

  const imageOnClick = useCallback(() => {
    uploadRef.current?.click();
  }, []);

  return (
    <div className={"w-fit h-fit"}>
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
    </div>
  );
}
