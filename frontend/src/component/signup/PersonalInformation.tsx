import React from "react";
import { College, Gender, Major } from "../../types";


interface IProps {
  nickname: string,
  setNickname: Function,
  birthday: Date,
  setBirthday: Function,
  college: College | null,
  setCollege: Function,
  major: Major | null,
  setMajor: Function,
  gender: Gender,
  setGender: Function,
  targetGender: Gender,
  setTargetGender: Function,
  setStep: Function,
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
