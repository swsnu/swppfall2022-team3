import * as React from "react";
import { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef } from "react";


interface IProps {
  src: string;
  disabled: boolean;
  uploadedPhotos: File[];
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
}

export default function ImageUploadIcon({
  src,
  disabled,
  uploadedPhotos,
  setUploadedPhotos,
}: IProps) {
  const uploadRef = useRef<HTMLInputElement | null>(null);

  const imageOnChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const uploaded = event.target.files;
    if (uploaded) {
      setUploadedPhotos([...uploadedPhotos, uploaded[0]]);
    }
  }, [uploadedPhotos, setUploadedPhotos]);

  const imageOnClick = useCallback(() => {
    uploadRef.current?.click();
  }, []);

  return (
    <div className={"w-fit h-fit"}>
      <input
        ref={uploadRef}
        className={"hidden"}
        type="file"
        accept="image/*"
        onChange={imageOnChange}
        disabled={disabled}
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
