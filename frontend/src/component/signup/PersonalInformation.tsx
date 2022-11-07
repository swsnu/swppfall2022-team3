import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCollege } from "../../store/slices/college";
import { selectMajor } from "../../store/slices/major";
import { College, Gender, Major } from "../../types";
import { parseGender } from "../../util/parseGender";
import CompleteSentence from "./CompleteSentence";
import InformationInput from "./InformationInput";


interface IProps {
  nickname: string,
  setNickname: Dispatch<SetStateAction<string>>,
  birthday: Date,
  setBirthday: Dispatch<SetStateAction<Date>>,
  college: College | null,
  setCollege: Dispatch<SetStateAction<College | null>>,
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
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const [targetMajors, setTargetMajors] = useState<Major[]>([]);
  const [hasSubmit, setHasSubmit] = useState<boolean>(false);

  const nicknameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);
  }, [setNickname]);

  const birthdayHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const date = e.target.valueAsDate;
    if (date) {
      setBirthday(date);
    }
  }, [setBirthday]);

  const changeCollegeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const collegeName = event.target.value;
    const targetCollege = colleges.find((col) => (col.name === collegeName));
    setCollege(targetCollege ?? null);
  }, [setCollege, colleges]);

  const changeMajorHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const majorName = event.target.value;
    const targetMajor = majors.find((mjr) => (mjr.name === majorName));
    setMajor(targetMajor ?? null);
  }, [setMajor, majors]);

  const changeGenderHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const genderStr = event.target.value;
    setGender(parseGender(genderStr));
  }, [setGender]);

  const changeTargetGenderHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const genderStr = event.target.value;
    setTargetGender(parseGender(genderStr));
  }, [setTargetGender]);

  const clickConfirmHandler = useCallback(() => {
    if (
      nickname &&
      birthday &&
      ((college?.key ?? 0) > 0) &&
      ((major?.key ?? 0) > 0) &&
      gender &&
      targetGender
    ) {
      setStep(3);
    }
    else {
      setHasSubmit(true);
    }
  }, [setStep, nickname, birthday, college, major, gender, targetGender]);

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
    <section className={"h-screen w-full flex flex-col"}>
      <CompleteSentence />
      <InformationInput
        label={"닉네임"}
        value={nickname}
        type={"text"}
        onChange={nicknameHandler}
        shouldWarn={hasSubmit && !nickname}
      />
      <InformationInput
        label={"생년월일"}
        value={birthday}
        type={"date"}
        onChange={birthdayHandler}
        shouldWarn={hasSubmit && !birthday}
      />
      <InformationInput
        label={"단과대"}
        value={college?.name ?? ""}
        type={"select"}
        onChange={changeCollegeHandler}
        options={
          ([{ key: 0, name: "", majors: [] }] as College[])
            .concat(colleges)
            .map((col) => ({ name: col.name, value: col.name }))
        }
        shouldWarn={hasSubmit && !college}
      />
      <InformationInput
        label={"학과"}
        value={major?.name ?? ""}
        type={"select"}
        onChange={changeMajorHandler}
        options={
          ([{ key: 0, name: "" }] as Major[])
            .concat(targetMajors)
            .map((m) => ({ name: m.name, value: m.name }))
        }
        shouldWarn={hasSubmit && !major}
      />
      <InformationInput
        label={"성별"}
        value={gender}
        type={"select"}
        onChange={changeGenderHandler}
        options={[
          { name: "남자", value: Gender.MALE },
          { name: "여자", value: Gender.FEMALE },
        ]}
        shouldWarn={hasSubmit && !gender}
      />
      <InformationInput
        label={"관심성별"}
        value={targetGender}
        type={"select"}
        onChange={changeTargetGenderHandler}
        options={[
          { name: "남자", value: Gender.MALE },
          { name: "여자", value: Gender.FEMALE },
          { name: "상관없음", value: Gender.ALL },
        ]}
        shouldWarn={hasSubmit && !targetGender}
      />
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-2 w-36 h-12 rounded-md"}
          onClick={clickConfirmHandler}
        >
          다음
        </button>
      </div>
    </section>
  );
}
