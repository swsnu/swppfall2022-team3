import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { sendVerificationCode } from "../../util/email";
import verification from "../../util/verification";


interface IProps {
  email: string,
  verificationCode: string,
  setVerificationCode: Dispatch<SetStateAction<string>>,
  setStep: Dispatch<SetStateAction<number>>,
}

export default function EmailVerification({
  email,
  verificationCode,
  setVerificationCode,
  setStep,
}: IProps) {
  const navigate = useNavigate();
  const [sec, setSec] = useState<number>(180);
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSec((sec) - 1);
      }
      else {
        clearInterval(countdown);
        alert("입력 가능한 시간이 지났습니다. 다시 학교 이메일을 입력해주세요.");
        navigate("/signup");
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [sec, navigate]);

  const clickReSendHandler = useCallback(() => {
    const newCode = verification.getCode();
    sendVerificationCode(email, newCode)
      .then(() => {
        return;
      });
    setVerificationCode(newCode);
    setSec(180);
  }, [email, setSec, setVerificationCode]);

  const clickHandler = useCallback(() => {
    if (code === verificationCode) {
      setStep(2);
    }
    else {
      alert("잘못된 인증코드입니다 \n다시 한 번 확인해주세요.");
    }
  }, [code, verificationCode, setStep]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <p className={"text-center text-pink-500/100 mt-6"}>
        인증 코드가 발송되었습니다!<br/>
        이메일을 확인해주세요.
      </p>
      <div className={"text-center mt-16"}>
        <label className={"text-center"}>
          <input
            className={"w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
            placeholder={" 인증코드"}
            value={code}
            onChange={(event) => setCode(event.target.value)}>
          </input>
          {`${Math.floor(sec / 60)}:`}{(sec % 60) < 10 ? `0${sec % 60}` : `${sec % 60}`}
        </label>
      </div>
      <div className={"text-center mt-24"}>
        <div>
          <button
            className={"bg-pink-500 text-center text-white m-2 w-36 h-12 rounded-md"}
            onClick={clickHandler}
          >
            확인
          </button>
        </div>
        <div>
          <button
            className={"bg-white-500 text-center text-pink-400 m-2 border-solid border-b-4 border-l-2 border-r-2 mt-2 w-36 h-12 rounded-md"}
            onClick={clickReSendHandler}
          >
            재전송
          </button>
        </div>
      </div>
    </section>
  );
}
