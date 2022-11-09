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
    <section className={"flex flex-col items-center w-full h-full"}>
      <p className="mt-16 mb-8 text-center text-pink-500/100">
        자신의 매력을 어필할 수 있는<br/>
        소개글을 작성해보세요!
      </p>
      <section className="flex-1 flex flex-col w-4/5 justify-center">
        <textarea
          className={"w-full h-80 align-text-top border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          placeholder="소개글을 작성해주세요!"
          value={introduction}
          onChange={(event) => setIntroduction(event.target.value)}
        />
        <article className={"text-red-500 text-sm w-full indent-4"}>
          {(hasSubmit) ? "필수 작성 항목입니다." : " "}
        </article>
      </section>
      <button
        className={"w-36 h-12 min-h-12 my-12 bg-pink-500 text-center text-white rounded-md"}
        onClick={confirmOnClick}
      >
        다음
      </button>
    </section>
  );
}
