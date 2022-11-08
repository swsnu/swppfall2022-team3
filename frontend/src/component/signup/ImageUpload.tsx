import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
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
  const [hasClickImgFirst, setHasClickImgFirst] = useState<boolean>(false);
  const [hasClickImgSecond, setHasClickImgSecond] = useState<boolean>(false);

  const imgSecondOnClick = useCallback(() => {
    if (hasClickImgFirst) {
      setHasClickImgSecond(true);
    }
  }, [setHasClickImgSecond, hasClickImgFirst]);

  const confirmOnClick = useCallback(() => {
    setStep(6);
  }, [setStep]);


  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <CompleteSentetnce />
      <article className={"mt-8 ml-8"}>프로필 이미지</article>
      <div className={"flex flex-wrap my-4"}>
        <input
          className={"flex-none mx-10 w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          onClick={() => (setHasClickImgFirst(true))}
          src={hasClickImgFirst ? photos[12].path : photos[14].path}
          alt={String(photos[12].index)}
        ></input>
        <input
          className={"flex-none w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          onClick={imgSecondOnClick}
          src={hasClickImgFirst ? (hasClickImgSecond ? photos[13].path : photos[14].path) : ""}
          alt=""
        ></input>
        <input
          className={"flex-none mx-10 my-4 w-24 h-24 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="image"
          src={hasClickImgSecond ? photos[14].path : ""}
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
          onClick={() => confirmOnClick()}
        >
          완료
        </button>
      </div>
    </section>
  );
}
