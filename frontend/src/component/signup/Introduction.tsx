import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";


interface IProps {
  introduction: string;
  setIntroduction: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function Introduction({
  introduction,
  setIntroduction,
  setStep
}: IProps) {
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  const confirmOnClick = useCallback(() => {
    if (introduction) {
      setStep(5);
    }
    else {
      setHasSubmit(true);
    }
  }, [setStep, introduction]);

  return (
    <section className={"flex flex-col items-center w-full mt-20 mb-16"}>
      <section className={"w-full h-[36rem] flex flex-col items-center"}>
        <p className="mb-8 text-center text-pink-500/100">
          자신의 매력을 어필할 수 있는<br />
          소개글을 작성해보세요!
        </p>
        <section className="w-[80vw]">
          <div className={"text-center"}>
            <textarea
              className={"w-full h-[50vh] align-text-top border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
              placeholder="소개글을 작성해주세요!"
              value={introduction}
              onChange={(event) => setIntroduction(event.target.value)}
            >
            </textarea>
          </div>
        </section>
        <article className={"ml-8 text-red-500 text-sm"}>{(hasSubmit) ? "필수 작성 항목입니다." : " "}</article>
      </section>
      <article className={"absolute bottom-12"}>
        <button
          className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
          onClick={confirmOnClick}
        >
          다음
        </button>
      </article>
    </section>
  );
}
