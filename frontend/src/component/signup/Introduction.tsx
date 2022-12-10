import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import style from "../../constant/style";


export interface IProps {
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

  const backOnClick = useCallback(() => {
    setIntroduction("");
    setStep(3);
  }, [setIntroduction, setStep]);

  return (
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        자신의 매력을 어필할 수 있는<br/>
        소개글을 작성해보세요!
      </p>
      <section className="flex-1 flex flex-col w-4/5 justify-start">
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
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mb-2`}
          onClick={backOnClick}
        >
          뒤로 가기
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.main}`}
          onClick={confirmOnClick}
        >
          다음
        </button>
      </section>
    </section>
  );
}
