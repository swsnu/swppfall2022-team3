import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import paths from "../../constant/path";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { fetchLoginUser, selectUser } from "../../store/slices/user";
import { userUrl } from "../../store/urls";


interface IProps {
  onModalClose: () => void;
}

export default function IntroEdit({ onModalClose }: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const [introduction, setIntroduction] = useState<string>(loginUser?.introduction ?? "");
  const dispatch = useDispatch<AppDispatch>();
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  const cancelOnClickHandler = useCallback( () => {
    onModalClose();
  },
  [onModalClose]);

  const confirmHandler = useCallback( async () => {
    if (introduction) {
      await axios.put(`${userUrl}${loginUser?.key}${paths.introduction}/`, {
        content: introduction
      }).then(() => {
        dispatch(fetchLoginUser(loginUser?.key ?? 0));
      });
      onModalClose();
    }
    else {
      setHasSubmit(true);
    }
  },
  [dispatch, introduction, loginUser?.key, onModalClose]);

  return (
    <section className={"h-fit w-[90vw] max-w-[400px] flex flex-col items-center bg-white p-4 space-y-8"}>
      <section className={"space-y-4"}>
        <div>
          소개글이 수정 가능합니다.
        </div>
        <section className="flex-1 flex flex-col justify-start">
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
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main} mt-16`}
          onClick={confirmHandler}
        >
          정보 수정
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mt-8`}
          onClick={cancelOnClickHandler}
        >
          취소
        </button>
      </section>
    </section>
  );
}
