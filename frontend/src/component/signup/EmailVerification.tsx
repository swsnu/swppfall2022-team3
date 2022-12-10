import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import axios from "axios";
import style from "../../constant/style";
import { authEmailUrl, authVerifyUrl } from "../../store/urls";
import SignInModal from "../SignInModal";
import InformationInput from "./InformationInput";


export interface IProps {
  email: string;
  limitSec: number;
  requestTime: Date;
  isOpenTimeoutModal: boolean;
  setRequestTime: Dispatch<SetStateAction<Date>>;
  setStep: Dispatch<SetStateAction<number>>;
  setIsOpenTimeoutModal: Dispatch<SetStateAction<boolean>>;
}

export default function EmailVerification({
  email,
  limitSec,
  requestTime,
  isOpenTimeoutModal,
  setRequestTime,
  setStep,
  setIsOpenTimeoutModal,
}: IProps) {
  const [sec, setSec] = useState<number>(limitSec);
  const [code, setCode] = useState<string>("");
  const [wrongModalOpen, setWrongModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (sec > 0) {
        setSec((sec) - 1);
      }
      else {
        clearInterval(countdown);
        setIsOpenTimeoutModal(true);
        setStep(0);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [sec, setIsOpenTimeoutModal, setSec, setStep]);

  const resendOnClick = useCallback(async () => {
    setRequestTime(new Date());
    await axios.post(`${authEmailUrl}/`, {
      email: email,
      request_time: requestTime,
    });
    setSec(180);
  }, [email, requestTime, setRequestTime, setSec]);

  const confirmOnClick = useCallback(async () => {
    try {
      const result = await axios.post(`${authVerifyUrl}/`, {
        email: email,
        request_time: requestTime,
        code: code,
      });
      if (result.status === 204) {
        setStep(2);
      }
    } catch (_) {
      setWrongModalOpen(true);
    }
  }, [email, requestTime, code, setStep]);

  return (
    <section className={style.page.base}>
      <SignInModal
        description={
          <p>
            잘못된 인증코드입니다.<br/>
            다시 한 번 확인해주세요.
          </p>
        }
        modalOpen={wrongModalOpen}
        setModalOpen={setWrongModalOpen}
      />
      <section className={"flex-1 w-full"}>
        <p className={style.component.signIn.notification}>
          인증 코드가 발송되었습니다!<br/>
          이메일을 확인해주세요.
        </p>
        <div className={"flex flex-row justify-center"}>
          <InformationInput
            label={"인증코드"}
            value={code}
            setValue={setCode}
            type={"text"}
            required={true}
          />
          <div className={"m-2"}>
            {`${Math.floor(sec / 60)}:`}{(sec % 60) < 10 ? `0${sec % 60}` : `${sec % 60}`}
          </div>
        </div>
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mb-2`}
          onClick={() => setStep(0)}
        >
          뒤로 가기
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mb-2`}
          onClick={resendOnClick}
        >
          재전송
        </button>
        <button
          className={`${style.button.base} ${style.button.colorSet.main}`}
          onClick={confirmOnClick}
        >
          확인
        </button>
      </section>
    </section>
  );
}
