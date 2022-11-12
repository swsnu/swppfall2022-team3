import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "../../constant/style";
import { selectCollege } from "../../store/slices/college";
import { selectMajor } from "../../store/slices/major";
import { College, Gender, Major } from "../../types";
import InformationInput from "./InformationInput";


interface IProps {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  birthday: Date;
  setBirthday: Dispatch<SetStateAction<Date>>;
  college: College | null;
  setCollege: Dispatch<SetStateAction<College | null>>;
  major: Major | null;
  setMajor: Dispatch<SetStateAction<Major | null>>;
  gender: Gender;
  setGender: Dispatch<SetStateAction<Gender>>;
  targetGender: Gender;
  setTargetGender: Dispatch<SetStateAction<Gender>>;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function PersonalInformation({
  username,
  setUsername,
  password,
  setPassword,
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
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const [selectedCollegeKey, setSelectedCollegeKey] = useState<number>(0);
  const [selectedMajorKey, setSelectedMajorKey] = useState<number>(0);
  const [targetMajors, setTargetMajors] = useState<Major[]>([]);

  const confirmOnClick = useCallback(() => {
    if (
      username &&
      birthday &&
      ((college?.key ?? 0) > 0) &&
      ((major?.key ?? 0) > 0) &&
      gender &&
      targetGender
    ) {
      setStep(3);
    }
    else {
      // do something later
    }
  }, [setStep, username, birthday, college, major, gender, targetGender]);

  useEffect(() => {
    const targetCollege = colleges.find((c) => (c.key === selectedCollegeKey));
    setCollege(targetCollege ?? null);
  }, [setCollege, selectedCollegeKey, colleges]);

  useEffect(() => {
    const targetMajor = majors.find((m) => (m.key === selectedMajorKey));
    setMajor(targetMajor ?? null);
  }, [setMajor, selectedMajorKey, majors]);

  useEffect(() => {
    if (college) {
      const collegeMajors = majors.filter((mjr) => (college.majors.includes(mjr.key)));
      setTargetMajors(collegeMajors);
    }
    else {
      setTargetMajors([]);
    }
  }, [college, majors]);

  return (
    <section className={style.page.base}>
      <p className={style.component.signIn.notification}>
        인증 완료!!<br/>
        다른 친구들에게 본인을 소개해보세요!
      </p>
      <section className={"flex-1 flex flex-col space-y-4"}>
        <InformationInput
          label={"닉네임"}
          value={username}
          setValue={setUsername}
          type={"text"}
        />
        <InformationInput
          label={"비밀번호"}
          value={password}
          setValue={setPassword}
          type={"text"}
          isPassword={true}
        />
        <InformationInput
          label={"생년월일"}
          value={birthday}
          setValue={setBirthday}
          type={"date"}
        />
        <InformationInput
          label={"단과대"}
          value={selectedCollegeKey}
          setValue={setSelectedCollegeKey}
          type={"select"}
          options={
            ([{ key: 0, name: "", majors: [] }] as College[])
              .concat(colleges)
              .map((col) => ({ name: col.name, value: col.key }))
          }
        />
        <InformationInput
          label={"학과"}
          value={selectedMajorKey}
          setValue={setSelectedMajorKey}
          type={"select"}
          options={
            ([{ key: 0, name: "" }] as Major[])
              .concat(targetMajors)
              .map((m) => ({ name: m.name, value: m.key }))
          }
        />
        <InformationInput
          label={"성별"}
          value={gender}
          setValue={setGender}
          type={"select"}
          options={[
            { name: "남자", value: Gender.MALE },
            { name: "여자", value: Gender.FEMALE },
          ]}
        />
        <InformationInput
          label={"관심성별"}
          value={targetGender}
          setValue={setTargetGender}
          type={"select"}
          options={[
            { name: "남자", value: Gender.MALE },
            { name: "여자", value: Gender.FEMALE },
            { name: "상관없음", value: Gender.ALL },
          ]}
        />
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.main}`}
          onClick={confirmOnClick}
        >
          다음
        </button>
      </section>
    </section>
  );
}
