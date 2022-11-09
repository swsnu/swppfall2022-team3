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
      <p className="mt-16 mb-8 text-center text-pink-500/100">
        나를 대표할 수 있는<br />
        사진을 올려주세요!
      </p>
      <section className={"flex-1 flex flex-col justify-start"}>
        <section className={"grid grid-cols-2 gap-2 px-12"}>
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
      </section>
      <article className="text-center text-pink-500/100 mt-6">
        ※ 본인의 사진이어야 합니다.
      </article>
      <section>
        <button
          className={"w-36 min-h-12 h-12 mt-12 mb-12 bg-pink-500 text-center text-white rounded-md"}
          onClick={confirmOnClick}
        >
          완료
        </button>
      </section>
    </section>
  );
}
