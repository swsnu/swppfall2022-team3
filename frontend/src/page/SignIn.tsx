import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectUser } from "../store/slices/user";
import path from "../constant/path";


export default function SignIn() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginHandler = () => {
    const thisUser = users.find((user) => (user.email === email));
    if (thisUser) {
      navigate(path.search);
    }
    else {
      setEmail("");
      setPassword("");
      alert("이메일이 틀렸습니다.");
    }
  }

  return (
    <section className="h-screen w-full flex flex-col mt-12 mb-16">
      <h1 className="text-center text-5xl text-pink-500 font-bold">두근두근</h1>
      <h1 className="text-center text-5xl text-pink-500 font-bold">캠퍼스</h1>
      <div className="flex justify-center mt-24">
        <label className="flex-none mx-8 my-1 text-center m-auto text-pink-500/100">{"이메일"}
          <input className="flex-auto mx-8 my-1 w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"
            value={email}
            onChange={(event) => setEmail(event.target.value)}></input>
        </label>
      </div>
      <div className="flex justify-center">
        <label className="flex-none mx-8 my-1 text-center m-auto text-pink-500/100">{"비밀번호"}
          <input className="flex-auto mx-8 my-1 w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}></input>
        </label>
      </div>
      <div className="text-center mt-24">
        <div>
          <button className="bg-white-500 text-center text-pink-400 border-solid border-b-4 border-l-2 border-r-2 w-36 h-8 rounded-md"
            disabled={!email || !password}
            onClick={() => loginHandler()}>
            로그인</button>
        </div>
        <div>
          <button className="bg-pink-500 text-center text-white mt-2 w-36 h-8 rounded-md"
            onClick={() => navigate(path.signUp)}>회원가입</button>
        </div>
      </div>
    </section>
  )
}
