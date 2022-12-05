import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import style from "../constant/style";
import { AppDispatch } from "../store";
import {fetchSignin, selectUser} from "../store/slices/user";
import { userUrl } from "../store/urls";
import InformationInput from "./signup/InformationInput";


interface IProps {
  onModalClose: () => void;
}

export default function LoginInfoChanger({onModalClose}: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const dispatch = useDispatch<AppDispatch>();
  const [nickname, setNickname] = useState<string>(loginUser?.nickname ?? "");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const confirmOnClick = useCallback(async () => {
    if (password === "" || nickname ==="") {
      alert("올바르지 않은 페스워드, 닉네임 입니다.");
    }
    else if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    else {
      const newLoginUser = {
        username: loginUser?.email ?? "",
        password: password,
      };
      await axios.put(`${userUrl}${loginUser?.key}/`, {
        email: loginUser?.email,
        password: password,
        phone: phone,
        nickname: nickname,
        gender: loginUser?.gender,
        interested_gender: loginUser?.interestedGender,
        birthday: loginUser?.birthday,
        university: loginUser?.university,
        college: loginUser?.college,
        major: loginUser?.major,
        introduction: loginUser?.introduction,
        tags: loginUser?.tags,
      }).then(() => {
        dispatch(fetchSignin(newLoginUser));
        onModalClose();
      });
    }
  }, [password, passwordCheck]);

  return (
    <section className={"h-fit w-fit flex flex-col items-center bg-white p-4"}>
      <section className={"space-y-4"}>
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
        <InformationInput
          label={"휴대폰"}
          value={phone}
          setValue={setPhone}
          type={"text"}
          required={true}
        />
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main}`}
          onClick={confirmOnClick}
        >
          적용
        </button>
      </section>
    </section>
  );
}
