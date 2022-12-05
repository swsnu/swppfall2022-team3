import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import axios from "axios";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { getUniversities, selectUniversity } from "../../store/slices/university";
import { userUrl , authEmailUrl } from "../../store/urls";
import { University } from "../../types";
import InformationInput from "./InformationInput";
import SignInModal from "./SignInModal";


export interface IProps {
  university: University | null;
  email: string;
  requestTime: Date | undefined;
  isOpenTimeoutModal: boolean;
  setUniversity: Dispatch<SetStateAction<University | null>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
  setIsOpenTimeoutModal: Dispatch<SetStateAction<boolean>>;
}

export default function UniversitySelect({
  university,
  email,
  requestTime,
  isOpenTimeoutModal,
  setUniversity,
  setEmail,
  setStep,
  setIsOpenTimeoutModal,
}: IProps) {
  const universities = useSelector(selectUniversity).universities;
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUniversityKey, setSelectedUniversityKey] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [emailInput, setEmailInput] = useState<string>("");

  const confirmOnClick = useCallback(async () => {
    const isExist = await axios.get(`${userUrl}exist/${email}`);
    if (isExist.data.exists) {
      setModalOpen(true);
    }
    else {
      await axios.post(`${authEmailUrl}`, {
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
      <SignInModal
        description={
          <p>
            입력 가능한 시간이 지났습니다.<br />
            다시 학교 이메일을<br />
            입력해주세요.
          </p>
        }
        modalOpen={isOpenTimeoutModal}
        setModalOpen={setIsOpenTimeoutModal}
      />
      <SignInModal
        description={
          <p>
            해당 계정이 이미 존재합니다.<br />
            다른 이메일을<br />
            입력해주세요.
          </p>
        }
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <section className={"flex-1"}>
        <p className={style.component.signIn.notification}>
          소속대학과<br />
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
