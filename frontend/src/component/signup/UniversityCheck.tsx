import * as React from "react";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { selectUniversity } from "../../store/slices/university";
import { selectUser } from "../../store/slices/user";
import { University } from "../../types";
import { sendVerificationCode } from "../../util/email";
import { getCode } from "../../util/verification";
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
  const [emailInput, setEmailInput] = useState<string>("");

  const confirmOnClick = useCallback(async () => {
    const doesEmailExist = users.find((user) => user.email === email);
    if (doesEmailExist) {
      alert("이미 존재하는 이메일입니다.");
    }
    else {
      const code = getCode();
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
      setEmail(`${emailInput}@${university.domain}`);
    }
    else {
      setEmail("");
    }
  }, [university, emailInput, setEmail]);

  return (
    <section className={"h-full w-full flex flex-col items-center"}>
      <section className={"flex-1"}>
        <p className={"mt-16 h-fit text-center text-pink-500/100"}>
          소속대학과<br />
          학교 이메일을 입력해주세요
        </p>
        <section className="flex flex-col items-center space-y-4 mt-8">
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
          <article className={"flex flex-row items-center text-center mb-6"}>
            <TextField
              sx={{
                maxWidth: 160,
                minWidth: 80,
              }}
              size={"small"}
              label={"이메일"}
              variant={"outlined"}
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              required
            />
            <article className={`flex-initial w-16 mx-2 text-left ${university ? "" : "text-gray-400"} overflow-x-visible`}>
              {university ? `@${university.domain}` : "@pitapat.com"}
            </article>
          </article>
        </section>
      </section>
      <section>
        <button
          className={"w-36 min-h-12 h-12 mt-12 mb-12 bg-pink-500 text-center text-white rounded-md"}
          onClick={confirmOnClick}
        >
          확인
        </button>
      </section>
    </section>
  );
}
