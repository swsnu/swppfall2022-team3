import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { sendVerificationCode } from "../../util/email";
import { getCode } from "../../util/verification";
import InformationInput from "./InformationInput";


interface IProps {
  email: string;
  verificationCode: string;
  setVerificationCode: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
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
        setStep(0);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [sec, navigate, setStep]);

  const resendOnClick = useCallback(() => {
    const newCode = getCode();
    sendVerificationCode(email, newCode)
      .then(() => {
        return;
      });
    setVerificationCode(newCode);
    setSec(180);
  }, [email, setSec, setVerificationCode]);

  const confirmOnClick = useCallback(() => {
    if (code === verificationCode) {
      setStep(2);
    }
    else {
      alert("잘못된 인증코드입니다 \n다시 한 번 확인해주세요.");
    }
  }, [code, verificationCode, setStep]);

  return (
    <section className={"h-full w-full flex flex-col items-center"}>
      <section className={"flex-1"}>
        <p className={"text-center text-pink-500/100 mt-16"}>
          인증 코드가 발송되었습니다!<br />
          이메일을 확인해주세요.
        </p>
        <div className={"flex flex-row place-content-center mt-8"}>
          <InformationInput
            label={"인증코드"}
            value={code}
            setValue={setCode}
            type={"text"}
          />
          <div className={"m-2"}>
            {`${Math.floor(sec / 60)}:`}{(sec % 60) < 10 ? `0${sec % 60}` : `${sec % 60}`}
          </div>
        </div>
      </section>
      <section className={"flex flex-col"}>
        <button
          className={"w-36 min-h-12 h-12 mt-12 bg-pink-500 text-center text-white rounded-md"}
          onClick={confirmOnClick}
        >
          확인
        </button>
        <button
          className={"w-36 min-h-12 h-12 mt-4 mb-12 bg-white-500 text-pink-400 text-center border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          onClick={resendOnClick}
        >
          재전송
        </button>
      </section>
    </section>
  );
}
