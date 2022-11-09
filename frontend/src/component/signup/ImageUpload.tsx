import * as React from "react";
import { Dispatch, SetStateAction, useCallback } from "react";
import ImageUploadIcon from "./ImageUploadIcon";


interface IProps {
  uploadedPhotos: File[];
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function ImageUpload({
  uploadedPhotos,
  setUploadedPhotos,
  setStep,
}: IProps) {
  const confirmOnClick = useCallback(() => {
    setStep(6);
  }, [setStep]);

  return (
    <section className={"flex flex-col items-center w-full"}>
      <section className={"mt-16 w-full h-[36rem] flex flex-col"}>
        <p className="mb-8 text-center text-pink-500/100">
          나를 대표할 수 있는<br />
          사진을 올려주세요!
        </p>
        <section className={"flex flex-wrap px-12"}>
          {uploadedPhotos.map((photo, index) => {
            const examples = ["photo13.jpeg", "photo14.jpeg"];
            return <ImageUploadIcon
              key={index}
              src={examples[index]}
              disabled={true}
              uploadedPhotos={uploadedPhotos}
              setUploadedPhotos={setUploadedPhotos}
            />;

            // DO NOT DELETE: will be used with real server
            // return <ImageUploadIcon
            //   src={photo.name}
            //   key={index}
            //   uploadedPhotos={uploadedPhotos}
            //   setUploadedPhotos={setUploadedPhotos}
            // />;
          })}
          <ImageUploadIcon
            src="plus.jpeg"
            disabled={false}
            uploadedPhotos={uploadedPhotos}
            setUploadedPhotos={setUploadedPhotos}
          />
        </section>
        <article className="text-center text-pink-500/100 mt-6">
          ※ 본인의 사진이어야 합니다.
        </article>
      </section>
      <article className={"absolute bottom-12"}>
        <button
          className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
          onClick={confirmOnClick}
        >
          완료
        </button>
      </article>
    </section>
  );
}
