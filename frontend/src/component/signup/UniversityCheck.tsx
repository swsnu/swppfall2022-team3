import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUniversity } from "../../store/slices/university";
import { selectUser } from "../../store/slices/user";
import verification from "../../util/verification";
import { sendVerificationCode } from "../../util/email";
import { University } from "../../types";


interface IProps {
  university: University | null,
  setUniversity: Function,
  email: string,
  setEmail: Function,
  setVerificationCode: Function,
  setStep: Function,
}

export default function UniversityCheck({
  university,
  setUniversity,
  email,
  setEmail,
  setVerificationCode,
  setStep,
}: IProps) {
  const universities = useSelector(selectUniversity).universities;
  const users = useSelector(selectUser).users;
  const [userInput, setUserInput] = useState<string>("");

  const changeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setUniversity(universities.find((univ) => (univ.name === event.target.value))!);
  }, [universities, setUniversity]);

  const clickHandler = useCallback(() => {
    const targetEmail = `${email}@${university?.domain}`;
    const isExist = users.find((user) => user.email === targetEmail);
    if (isExist) {
      alert("이미 존재하는 이메일입니다.");
    }
    else {
      const code = verification.getCode();
      sendVerificationCode(targetEmail, code)
        .then(() => {
        });
      setVerificationCode(code);
      setStep(1);
    }
  }, [users, email, university, setStep, setVerificationCode]);

  useEffect(() => {
    if (university) {
      setEmail(`${userInput}@${university.domain}`);
    }
    else {
      setEmail("");
    }
  }, [university, userInput, setEmail]);

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
      <p className={"text-center text-pink-500/100 mt-6"}>
        소속대학과<br/>
        학교 이메일을 입력해주세요
      </p>
      <div className={"text-center mt-16"}>
        <select
          className={"w-48 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={undefined}
          onChange={changeHandler}
        >{
            ([{ key: 0, name: "", domain: "", colleges: [] }] as University[])
              .concat(universities)
              .map((univ) => (
                <option
                  key={univ.key}
                  value={univ.name}
                  className={"text-center"}
                >{
                    univ.name
                  }</option>
              ))
          }</select>
      </div>
      <div className={"text-center mt-2"}>
        <label className={"text-center"}>
          <input
            className={"mx-2 w-36 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
          />
          {`@${university?.domain ?? ""}`}
        </label>
      </div>
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-24 w-36 h-12 rounded-md"}
          onClick={() => clickHandler()}
          disabled={!email}
        >
          확인
        </button>
      </div>
    </section>
  );
}
