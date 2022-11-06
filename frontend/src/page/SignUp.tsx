import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectUniversity } from "../store/slices/university";
import { AppDispatch } from "../store";
import { selectUser } from "../store/slices/user";
import { verificationAction } from "../store/slices/verification";
import { sendVerificationCode } from "../util/email";
import path from "../constant/path";


export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const universities = useSelector(selectUniversity).universities;
  const users = useSelector(selectUser).users;
  const [emailDomain, setEmailDomain] = useState<string>(universities[0].domain);
  const [email, setEmail] = useState<string>("");

  const changeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const thisUniv = universities.find((univ) => (univ.name === event.target.value))!;
    setEmailDomain(thisUniv.domain);
  }

  const clickHandler = () => {
    const thisEmail = `${email}@${emailDomain}`;
    const isExist = users.find((user) => user.email === thisEmail);
    if (isExist) {
      alert("이미 존재하는 이메일입니다.");
      setEmail("");
    }
    else {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      sendVerificationCode(thisEmail, result);
      dispatch(verificationAction.add({ email: thisEmail, verificationCode: result }));
      navigate(path.signUpverify);
    }
  }

  return (
    <section className="h-screen w-full flex flex-col mt-12 mb-16">
      <p className="text-center text-pink-500/100 mt-6">소속대학과</p>
      <p className="text-center text-pink-500/100">학교 이메일을 입력해주세요</p>
      <div className="text-center mt-16">
        <select className="w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md" onChange={(event) => changeHandler(event)}>{
          universities.map((univ) => (
            <option key={univ.key} value={univ.name} className="text-center">{univ.name}</option>
          ))
        }</select>
      </div>
      <div className="text-center mt-2">
        <label className="text-center">
          <input className="mx-2 w-36 border-solid border-b-4 border-l-2 border-r-2 rounded-md"
            value={email}
            onChange={(event) => setEmail(event.target.value)}></input>
          {`@${emailDomain}`}</label>
      </div>
      <div className="text-center">
        <button className="bg-pink-500 text-center text-white mt-24 w-36 h-8 rounded-md"
          onClick={() => clickHandler()}
          disabled={!email}>확인</button>
      </div>
    </section>
  )
}
