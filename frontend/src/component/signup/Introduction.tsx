import React, { Dispatch, SetStateAction, useCallback } from "react";
import CompleteSentence from "./CompleteSentence";


interface IProps {
  introduction: string,
  setIntroduction: Dispatch<SetStateAction<string>>,
  setStep: Dispatch<SetStateAction<number>>,
}

export default function Introduction({
  introduction,
  setIntroduction,
  setStep
}: IProps) {
  const clickConfirmHandler = useCallback(() => {
    setStep(5);
  }, [setStep]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <CompleteSentence />
      <article className={"mt-8 ml-8"}>소개글</article>
      <div className={"text-center"}>
        <textarea
          className={"w-64 h-96 inline-block align-text-top border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          placeholder="소개글을 작성해주세요!"
          value={introduction}
          onChange={(event) => setIntroduction(event.target.value)}
        >
        </textarea>
      </div>
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-8 w-36 h-12 rounded-md"}
          onClick={() => clickConfirmHandler()}
          disabled={!introduction}
        >
          다음
        </button>
      </div>
    </section>
  );
}