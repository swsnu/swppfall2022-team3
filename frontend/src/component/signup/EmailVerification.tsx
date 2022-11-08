import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TextField } from "@mui/material";
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
        setStep(0);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [sec, navigate, setStep]);

  const resendOnClick = useCallback(() => {
    const newCode = verification.getCode();
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
    <section className={"w-full mt-12 mb-16"}>
      <section className={"w-full h-[32rem] flex flex-col"}>
        <p className={"text-center text-pink-500/100 mt-36 my-16"}>
          인증 코드가 발송되었습니다!<br />
          이메일을 확인해주세요.
        </p>
        <div className={"flex flex-row place-content-center"}>
          <TextField
            sx={{
              maxWidth: 320,
              minWidth: 200,
            }}
            size={"small"}
            label={"인증코드"}
            variant={"outlined"}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            required
          />
          <div className={"mt-2"}>
            {`${Math.floor(sec / 60)}:`}{(sec % 60) < 10 ? `0${sec % 60}` : `${sec % 60}`}
          </div>
        </div>
      </section>
      <section>
        <div className={"text-center"}>
          <div>
            <button
              className={"bg-pink-500 text-center text-white w-36 h-12 rounded-md"}
              onClick={confirmOnClick}
            >
              확인
            </button>
          </div>
          <div>
            <button
              className={"bg-white-500 text-center text-pink-400 border-solid border-b-4 border-l-2 border-r-2 mt-2 w-36 h-12 rounded-md"}
              onClick={resendOnClick}
            >
              재전송
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
