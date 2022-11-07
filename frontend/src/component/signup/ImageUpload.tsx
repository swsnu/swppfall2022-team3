import React, { Dispatch, SetStateAction, useCallback } from "react";
import { photos } from "../../dummyData";
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
    setStep(6);
  }, [setStep]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <CompleteSentetnce />
      <article className={"mt-8 ml-8"}>프로필 이미지</article>
      <div className={"flex flex-wrap my-4"}>
        <input
          className={"flex-none mx-10 w-24 h-24 rounded-md"}
          type="image"
          src={photos[1].path}
          alt={String(photos[1].index)}
        ></input>
        <input
          className={"flex-none w-24 h-24 rounded-md"}
          type="image"
          src={photos[2].path}
          alt={String(photos[2].index)}
        ></input>
        <input
          className={"flex-none mx-10 my-4 w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          alt=""
        ></input>
        <input
          className={"flex-none w-24 h-24 my-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          alt=""
        ></input>
        <input
          className={"flex-none mx-10 w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          alt=""
        ></input>
        <input
          className={"flex-none w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          alt=""
        ></input>
      </div>
      <article className="text-center text-pink-500/100 mt-6">
        경고문구<br />
        ex) 본인의 사진이어야 합니다.
      </article>
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-8 w-36 h-12 rounded-md"}
          onClick={() => clickConfirmHandler()}
        >
          완료
        </button>
      </div>
    </section>
  );
}
