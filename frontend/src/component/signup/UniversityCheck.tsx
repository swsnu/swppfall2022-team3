import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { selectUniversity } from "../../store/slices/university";
import { selectUser } from "../../store/slices/user";
import { University } from "../../types";
import { sendVerificationCode } from "../../util/email";
import verification from "../../util/verification";
import InformationInput from "./InformationInput";


interface IProps {
  university: University | null;
  setUniversity: Dispatch<SetStateAction<University | null>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setVerificationCode: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
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
  const [selectedUniversityKey, setSelectedUniversityKey] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>("");

  const confirmOnClick = useCallback(async () => {
    const doesEmailExist = users.find((user) => user.email === email);
    if (doesEmailExist) {
      alert("이미 존재하는 이메일입니다.");
    }
    else {
      const code = verification.getCode();
      await sendVerificationCode(email, code);
      setVerificationCode(code);
      setStep(1);
    }
  }, [users, email, setStep, setVerificationCode]);

  useEffect(() => {
    setUniversity(universities.find((u) => u.key === selectedUniversityKey) ?? null);
  }, [selectedUniversityKey, setUniversity, universities]);

  useEffect(() => {
    if (university) {
      setEmail(`${userInput}@${university.domain}`);
    }
    else {
      setEmail("");
    }
  }, [university, userInput, setEmail]);

  return (
    <section className={"w-full mt-12 mb-16"}>
      <section className={"w-full h-[32rem] flex flex-col items-center"}>
        <p className={"text-center text-pink-500/100 mt-36 my-16"}>
          소속대학과<br />
          학교 이메일을 입력해주세요
        </p>
        <div>
          <InformationInput
            label={"소속대학"}
            value={selectedUniversityKey}
            setValue={setSelectedUniversityKey}
            type={"select"}
            options={
              ([{ name: "", key: 0 }] as University[])
                .concat(universities)
                .map((u) => ({ name: u.name, value: u.key }))
            }
          />
        </div>
        <section className="w-[12.5rem]">
          <div className={"flex flex-row items-center text-center mb-6"}>
            <TextField
              sx={{
                maxWidth: 120,
                minWidth: 80,
              }}
              size={"small"}
              label={"이메일"}
              variant={"outlined"}
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
              required
            />
            <article className={"flex-initial w-20 ml-2 text-left"}>
              {university ? `@${university.domain}` : ""}
            </article>
          </div>
        </section>
      </section>
      <section className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-14 w-36 h-12 rounded-md"}
          onClick={confirmOnClick}
          disabled={!email}
        >
          확인
        </button>
      </section>
    </section>
  );
}
