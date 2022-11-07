import React, { Dispatch, SetStateAction, useCallback } from "react";
import CompleteSentetnce from "./CompleteSentence";


interface IProp {
  images: File[],
  setImages: Dispatch<SetStateAction<File[]>>,
  setStep: Dispatch<SetStateAction<number>>,
}

export default function ImageUpload({
  images,
  setImages,
  setStep,
}: IProp) {
  const clickConfirmHandler = useCallback(() => {
    setStep(5);
  }, [setStep]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <CompleteSentetnce />
      <article className={"mt-8 ml-8"}>프로필 이미지</article>
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-8 w-36 h-12 rounded-md"}
          onClick={() => clickConfirmHandler()}
          disabled={images.length === 0}
        >
          확인
        </button>
      </div>
    </section>
  );
}
