import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sendVerificationCode } from "../util/email";
import { verificationAction, selectVerification } from "../store/slices/verification";
import { AppDispatch } from "../store";



export default function SignUpVerify() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const email = useSelector(selectVerification).email;
  const verificationCode = useSelector(selectVerification).verificationCode;
  const [min, setMin] = useState<number>(3);
  const [sec, setSec] = useState<number>(0);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSec((sec) - 1);
      }
      if (sec === 0) {
        if (min === 0) {
          clearInterval(countdown);
          alert("입력 가능한 시간이 지났습니다. 다시 학교 이메일을 입력해주세요.")
          navigate("/signup");
        } else {
          setMin(min - 1);
          setSec(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [min, sec, navigate]);

  const clickReSendHandler = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    sendVerificationCode(email, result);
    dispatch(verificationAction.add({ email: email, verificationCode: result }));
    setMin(3);
    setSec(0);
  }

  const clickHandler = () => {
    if (code === verificationCode) {
      navigate("/search");
    }
    else {
      alert("인증 코드가 틀렸습니다. 다시 학교 이메일을 입력해주세요.");
      navigate("/signup");
    }
  }

  return (
    <section className="h-screen w-full flex flex-col mt-12 mb-16">
      <p className="text-center text-pink-500/100 mt-6">인증 코드가 발송되었습니다!</p>
      <p className="text-center text-pink-500/100">이메일을 확인해주세요.</p>
      <div className="text-center mt-16">
        <label className="text-center">
          <input className="w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"
            placeholder=" 인증코드"
            value={code}
            onChange={(event) => setCode(event.target.value)}>
          </input>
          {`${min}:`}{sec < 10 ? `0${sec}` : `${sec}`}</label>
      </div>
      <div className="text-center mt-24">
        <div>
          <button className="bg-white-500 text-center text-pink-400 border-solid border-b-4 border-l-2 border-r-2 w-36 h-8 rounded-md"
            onClick={() => clickReSendHandler()}>
            재전송</button>
        </div>
        <div>
          <button className="bg-pink-500 text-center text-white mt-2 w-36 h-8 rounded-md"
            onClick={() => clickHandler()}>확인</button>
        </div>
      </div>
    </section>
  )
}