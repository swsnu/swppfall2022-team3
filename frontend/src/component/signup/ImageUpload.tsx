import * as React from "react";
import { Dispatch, SetStateAction, useCallback } from "react";
import CompleteSentetnce from "./CompleteSentence";
import ImageUploadIcon from "./ImageUploadIcon";


interface IProps {
  uploadedPhotos: File[],
  setUploadedPhotos: Dispatch<SetStateAction<File[]>>,
  setStep: Dispatch<SetStateAction<number>>,
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
    <section className={"h-screen w-full mt-12 mb-16"}>
      <section className={"h-screen w-full h-[36rem] flex flex-col"}>
        <CompleteSentetnce />
        <article className={"ml-6"}>
          프로필 이미지
        </article>
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
      <section className={"text-center mt-8"}>
        <button
          className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
          onClick={confirmOnClick}
        >
          완료
        </button>
      </section>
    </section>
  );
}
