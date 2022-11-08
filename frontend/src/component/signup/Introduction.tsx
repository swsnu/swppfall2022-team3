import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
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
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  const clickConfirmHandler = useCallback(() => {
    if (introduction) {
      setStep(5);
    }
    else {
      setHasSubmit(true);
    }
  }, [setStep, introduction]);

  return (
    <section className={"w-full mt-12 mb-16"}>
      <section className={"w-full h-[36rem] flex flex-col items-center"}>
        <CompleteSentence />
        <section className="w-[85%]">
          <article className={"mt-4 mb-2"}>소개글</article>
          <div className={"text-center"}>
            <textarea
              className={"w-full h-96 inline-block align-text-top border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
              placeholder="소개글을 작성해주세요!"
              value={introduction}
              onChange={(event) => setIntroduction(event.target.value)}
            >
            </textarea>
          </div>
        </section>
        <article className={"ml-8 text-red-500 text-sm"}>{(hasSubmit) ? "필수 작성 항목입니다." : " "}</article>
      </section>
      <section className={"text-center mt-8"}>
        <button
          className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
          onClick={() => clickConfirmHandler()}
        >
          다음
        </button>
      </section>
    </section>
  );
}
