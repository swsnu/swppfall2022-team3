import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
import AlertModal from "../component/AlertModal";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { fetchSignin, selectUser } from "../store/slices/user";


export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const passwordInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loginUser) {
      navigate(paths.search);
    }
  }, [navigate, loginUser]);

  const loginOnClick = useCallback(() => {
    const loginData = {
      username: email,
      password: password,
    };
    dispatch(fetchSignin(loginData)).then((response) => {
      if (response.payload === null) {
        setModalOpen(true);
      }
    });
  }, [email, dispatch, password]);

  return (
    <section className={style.page.base}>
      <AlertModal
        description={
          <p>
            로그인에 실패했습니다.<br />
            이메일이나 비밀번호를<br />
            확인해주세요.
          </p>
        }
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <h1 className={"text-center text-5xl text-pink-500 font-bold mt-24 my-16"}>
        두근두근<br />
        캠퍼스
      </h1>
      <div className={"flex-1 flex flex-col w-4/5 justify-center items-center"}>
        <div className={"flex flex-row w-full justify-center"}>
          <article className={`w-24 text-${style.color.main} font-bold text-center leading-10`}>
            이메일
          </article>
          <TextField
            sx={{
              maxWidth: 240,
              minWidth: 200,
              width: "75%",
            }}
            size={"small"}
            placeholder={"이메일"}
            variant={"outlined"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                passwordInput.current?.focus();
              }
            }}
            required
          />
        </div>
        <div className={"flex flex-row w-full justify-center mt-2 mb-24"}>
          <article className={`w-24 text-${style.color.main} font-bold text-center leading-10`}>
            비밀번호
          </article>
          <TextField
            inputRef={passwordInput}
            sx={{
              maxWidth: 240,
              minWidth: 200,
              width: "75%",
            }}
            size={"small"}
            placeholder={"비밀번호"}
            type={"password"}
            variant={"outlined"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                loginOnClick();
              }
            }}
            required
          />
        </div>
      </div>
      <section className={"flex flex-col items-center my-12"}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main} mb-2`}
          disabled={!email || !password}
          onClick={loginOnClick}
        >
          로그인
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary}`}
          onClick={() => navigate(paths.signUp)}
        >
          회원가입
        </button>
      </section>
    </section>
  );
}
