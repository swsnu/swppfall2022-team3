import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { fetchSignin, selectUser } from "../store/slices/user";
import { passwordChange, userUrl } from "../store/urls";
import AlertModal from "./AlertModal";
import InformationInput from "./signup/InformationInput";


interface IProps {
  onModalClose: () => void;
}

export default function LoginInfoChanger({ onModalClose }: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const dispatch = useDispatch<AppDispatch>();
  const [nickname, setNickname] = useState<string>(loginUser?.nickname ?? "");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<JSX.Element>(<div/>);

  const confirmOnClick = useCallback(async () => {
    if (password === "" || nickname === "") {
      setModalMessage(<p>닉네임과 비밀번호를<br/>입력해야 합니다.</p>);
      setModalOpen(true);
      return;
    }
    if (password !== passwordCheck) {
      setModalMessage(<p>비밀번호가 일치하지 않습니다.</p>);
      setModalOpen(true);
      return;
    }
    const newLoginUser = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      username: loginUser!.email,
      password: password,
    };
    try {
      await axios.post(`${passwordChange}/`, {
        new_password1: password,
        new_password2: password,
      });
    }
    catch {
      setModalMessage(<p>비밀번호가 너무 쉽습니다.</p>);
      setModalOpen(true);
      return;
    }
    await axios.put(`${userUrl}/${loginUser?.key}/`, {
      email: loginUser?.email,
      nickname: nickname,
      gender: loginUser?.gender,
      interested_gender: loginUser?.interestedGender,
      birthday: loginUser?.birthday,
      university: loginUser?.university,
      college: loginUser?.college,
      major: loginUser?.major,
      introduction: loginUser?.introduction,
      tags: loginUser?.tags,
    });
    dispatch(fetchSignin(newLoginUser));
    onModalClose();
  }, [
    dispatch,
    loginUser,
    nickname,
    onModalClose,
    password,
    passwordCheck,
  ]);

  const cancelOnClick = useCallback( () => {
    onModalClose();
  },
  [onModalClose]);

  return (
    <section>
      <AlertModal
        description={modalMessage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <section className={"h-fit w-fit flex flex-col items-center bg-white p-4"}>
        <article className={"space-y-4"}>
          <InformationInput
            label={"닉네임"}
            value={nickname}
            setValue={setNickname}
            type={"text"}
            required={true}
          />
          <InformationInput
            label={"비밀번호"}
            value={password}
            setValue={setPassword}
            type={"text"}
            required={true}
            isPassword={true}
          />
          <InformationInput
            label={"비밀번호 확인"}
            value={passwordCheck}
            setValue={setPasswordCheck}
            type={"text"}
            required={true}
            isPassword={true}
          />
        </article>
        <article className={"flex flex-col mt-8"}>
          <button
            className={`${style.button.base} ${style.button.colorSet.main}`}
            onClick={confirmOnClick}
          >
          적용
          </button>
          <button
            className={`${style.button.base} ${style.button.colorSet.secondary} mt-4`}
            onClick={cancelOnClick}
          >
          취소
          </button>
        </article>
      </section>
    </section>
  );
}
