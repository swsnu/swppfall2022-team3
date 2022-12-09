import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { fetchSignin, selectUser } from "../store/slices/user";
import { userUrl } from "../store/urls";


interface IProps {
  onModalClose: () => void;
}

export default function RemoveAccount({ onModalClose }: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const cancelOnClickHandler = useCallback( () => {
    onModalClose();
  },
  [onModalClose]);

  const removeOnClickHandler = useCallback( async () => {
    if (!loginUser) {
      return;
    }
    const removedLoginUser = { username: "", password: "" };
    try {
      await axios.delete(`${userUrl}/${loginUser.key}/`);
    }
    catch  {
      // do nothing
    }
    dispatch(fetchSignin(removedLoginUser));
    navigate(paths.signIn);
    onModalClose();
  },
  [dispatch, loginUser, navigate, onModalClose]);

  return (
    <section className={"h-fit w-fit flex flex-col items-center bg-white p-4"}>
      <section className={"space-y-4"}>
        <div>
          정말로 계정을 삭제하겠습니까?
        </div>
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main} mt-16`}
          onClick={removeOnClickHandler}
        >
          계정 삭제
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
