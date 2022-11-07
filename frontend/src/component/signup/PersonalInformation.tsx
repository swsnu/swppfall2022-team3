import React, { Dispatch, SetStateAction } from "react";
import { College, Gender, Major } from "../../types";


interface IProps {
  nickname: string,
  setNickname: Dispatch<SetStateAction<string>>,
  birthday: Date,
  setBirthday: Dispatch<SetStateAction<Date>>,
  college: College | null,
  setCollege: Function,
  major: Major | null,
  setMajor: Dispatch<SetStateAction<Major | null>>,
  gender: Gender,
  setGender: Dispatch<SetStateAction<Gender>>,
  targetGender: Gender,
  setTargetGender: Dispatch<SetStateAction<Gender>>,
  setStep: Dispatch<SetStateAction<number>>,
}

export default function PersonalInformation({
  nickname,
  setNickname,
  birthday,
  setBirthday,
  college,
  setCollege,
  major,
  setMajor,
  gender,
  setGender,
  targetGender,
  setTargetGender,
  setStep,
}: IProps) {
  return (
    <section>
      this is personal information page
    </section>
  );
}
