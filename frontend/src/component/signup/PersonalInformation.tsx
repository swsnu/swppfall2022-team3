import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCollege } from "../../store/slices/college";
import { selectMajor } from "../../store/slices/major";
import { College, Gender, Major } from "../../types";
import CompleteSentence from "./CompleteSentence";


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
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;
  const [targetMajors, setTargetMajors] = useState<Major[]>([]);

  const changeBirthdayHandler = (event: string) => {
    if (event.match(/^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)) {
      setBirthday(new Date(event))
    }
    else {
      setBirthday();
    }
  }

  const changeCollegeHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setCollege(colleges.find((col) => (col.name === event.target.value))!);
  }, [setCollege, colleges]);

  const changeMajorHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setMajor(majors.find((mjr) => (mjr.name === event.target.value))!);
  }, [setMajor, majors]);

  const changeGenderHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  }, [setGender]);

  const changeTargetGenderHandler = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setTargetGender(event.target.value);
  }, [setTargetGender]);

  const clickConfirmHandler = useCallback(() => {
    setStep(3);
  }, [setStep]);

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
    < section className={"h-screen w-full flex flex-col mt-12 mb-16"} >
      <CompleteSentence />
      <article className={"mt-8 ml-8 leading-10"}>닉네임</article>
      <div className="text-center">
        <input className={"w-64 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          placeholder={"닉네임"}
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}>
        </input>
      </div>
      <article className={"mt-4 ml-8 leading-10"}>생년월일</article>
      <div className="text-center">
        <input className={"w-64 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          placeholder={"YYYY-MM-DD"}
          onChange={(event) => changeBirthdayHandler(event.target.value)}>
        </input>
      </div>
      <article className={"mt-4 ml-8 leading-10"}>단과대</article>
      <div className="text-center">
        <select
          className={"w-64 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={undefined}
          onChange={changeCollegeHandler}
        >{
            ([{ key: 0, name: "", majors: [] }] as College[])
              .concat(colleges)
              .map((col) => (
                <option
                  key={col.key}
                  value={col.name}
                >{
                    col.name
                  }
                </option>
              ))
          }</select>
      </div>
      <article className={"mt-4 ml-8 leading-10"}>학과</article>
      <div className="text-center">
        <select
          className={"w-64 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={undefined}
          onChange={changeMajorHandler}
        >{
            targetMajors.map((mjr) => (
              <option
                key={mjr.key}
                value={mjr.name}
              >{
                  mjr.name
                }
              </option>
            ))
          }</select>
      </div>
      <article className={"mt-4 ml-8 leading-10"}>성별</article>
      <div className="text-center">
        <select
          className={"w-64 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={undefined}
          onChange={changeGenderHandler}
        >
          <option key="0" value={Gender.MALE}>남자</option>
          <option key="1" value={Gender.FEMALE}>여자</option>
        </select>
      </div>
      <article className={"mt-4 ml-8 leading-10"}>관심성별</article>
      <div className="text-center">
        <select
          className={"w-64 indent-4 border-solid border-b-4 border-l-2 border-r-2 rounded-md"}
          value={undefined}
          onChange={changeTargetGenderHandler}
        >
          <option key="0" value={Gender.FEMALE}>여자</option>
          <option key="1" value={Gender.MALE}>남자</option>
          <option key="2" value={Gender.ALL}>모두</option>
        </select>
      </div>
      <div className={"text-center"}>
        <button
          className={"bg-pink-500 text-center text-white mt-8 w-36 h-12 rounded-md"}
          onClick={() => clickConfirmHandler()}
          disabled={!nickname || !birthday || !college || !major || !gender || !targetGender}
        >
          다음
        </button>
      </div>
    </section >
  )
}
