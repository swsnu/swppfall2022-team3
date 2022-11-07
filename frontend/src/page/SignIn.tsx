import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import path from "../constant/path";
import { AppDispatch } from "../store";
import { selectUser, userActions } from "../store/slices/user";


export default function SignIn() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginOnClick = useCallback(() => {
    const thisUser = users.find((user) => (user.email === email));
    if (thisUser) {
      dispatch(userActions.login(thisUser));
      navigate(path.search);
    }
    else {
      alert("이메일이 틀렸습니다.");
    }
  }, [users, email, dispatch, navigate]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <h1 className={"text-center text-5xl text-pink-500 font-bold mt-16"}>
        두근두근<br/>
        캠퍼스
      </h1>
      <div className={"flex flex-row justify-center mt-28"}>
        <article className={"flex-1 text-pink-500 font-bold text-center leading-10"}>
          이메일:
        </article>
        <input
          className={"h-8 ml-4 mr-8 my-1 w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className={"flex flex-row justify-center mb-24"}>
        <article className={"flex-1 text-pink-500 font-bold text-center leading-10"}>
          비밀번호:
        </article>
        <input
          className={"h-8 ml-4 mr-8 my-1 w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className={"text-center mt-16"}>
        <div>
          <button
            className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
            disabled={!email || !password}
            onClick={loginOnClick}
          >
            로그인
          </button>
        </div>
        <div>
          <button
            className={"bg-white-500 text-center text-pink-400 border-solid border-solid border-b-4 border-l-2 border-r-2 mt-2 w-36 h-12 rounded-md"}
            onClick={() => navigate(path.signUp)}
          >
            회원가입
          </button>
        </div>
      </div>
    </section>
  );
}
