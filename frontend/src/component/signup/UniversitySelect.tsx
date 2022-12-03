import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import axios from "axios";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { getUniversities, selectUniversity } from "../../store/slices/university";
import { userUrl } from "../../store/slices/user";
import { University } from "../../types";
import InformationInput from "./InformationInput";


export interface IProps {
  university: University | null;
  email: string;
  requestTime: Date | undefined;
  setUniversity: Dispatch<SetStateAction<University | null>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function UniversitySelect({
  university,
  email,
  requestTime,
  setUniversity,
  setEmail,
  setStep,
}: IProps) {
  const universities = useSelector(selectUniversity).universities;
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUniversityKey, setSelectedUniversityKey] = useState<number>(0);
  const [emailInput, setEmailInput] = useState<string>("");

  const confirmOnClick = useCallback(async () => {
    const isExist = await axios.get(`${userUrl}/exist/${email}`);
    if (isExist.data.exists) {
      alert("이미 존재하는 이메일입니다.");
    }
    else {
      await axios.post("/auth/email/", {
        email: email,
        request_time: requestTime,
      });
      setStep(1);
    }
  }, [email, requestTime, setStep]);

  useEffect(() => {
    dispatch(getUniversities());
  }, [dispatch]);

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
    <section className={style.page.base}>
      <section className={"flex-1"}>
        <p className={style.component.signIn.notification}>
          소속대학과<br/>
          학교 이메일을 입력해주세요
        </p>
        <section className="flex flex-col items-center space-y-4 mt-8">
          <InformationInput
            label={"소속대학"}
            value={selectedUniversityKey}
            setValue={setSelectedUniversityKey}
            type={"select"}
            required={true}
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
              placeholder={"이메일"}
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
      <section className={style.component.signIn.buttonWrapper}>
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
