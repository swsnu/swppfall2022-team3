import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "../../constant/style";
import { AppDispatch } from "../../store";
import { getColleges, selectCollege } from "../../store/slices/college";
import { getMajorsByCollege, selectMajor } from "../../store/slices/major";
import { College, Gender, Major, University } from "../../types";
import InformationInput from "./InformationInput";
import SignInModal from "./SignInModal";


export interface IProps {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  birthday: Date;
  setBirthday: Dispatch<SetStateAction<Date>>;
  university: University | null;
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
  nickname,
  setNickname,
  password,
  setPassword,
  birthday,
  setBirthday,
  university,
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
  const dispatch = useDispatch<AppDispatch>();
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [selectedCollegeKey, setSelectedCollegeKey] = useState<number>(colleges.length === 0 ? 0 : colleges[0].key);
  const [selectedMajorKey, setSelectedMajorKey] = useState<number>(majors.length === 0 ? 0 : majors[0].key);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const confirmOnClick = useCallback(() => {
    if (password !== passwordCheck) {
      setModalOpen(true);
    }
    else if (
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
      // do something later
    }
  }, [password, passwordCheck, setStep, nickname, birthday, college, major, gender, targetGender]);

  const backOnClick = useCallback(() => {
    setNickname("");
    setPassword("");
    setStep(0);
  }, [setNickname, setPassword, setStep]);

  useEffect(() => {
    if (university) {
      dispatch(getColleges(university.key));
    }
  }, [dispatch, university]);

  useEffect(() => {
    if (college) {
      dispatch(getMajorsByCollege(college.key));
    }
  }, [dispatch, college]);

  useEffect(() => {
    if (colleges.length !== 0) {
      setSelectedCollegeKey(colleges[0].key);
    }
    else {
      setSelectedCollegeKey(0);
    }
  }, [colleges, setSelectedCollegeKey]);

  useEffect(() => {
    if (majors.length !== 0) {
      setSelectedMajorKey(majors[0].key);
    }
    else {
      setSelectedMajorKey(0);
    }
  }, [majors, setSelectedMajorKey]);

  useEffect(() => {
    const targetCollege = colleges.find((c) => (c.key === selectedCollegeKey));
    setCollege(targetCollege ?? null);
  }, [setCollege, selectedCollegeKey, colleges]);

  useEffect(() => {
    const targetMajor = majors.find((m) => (m.key === selectedMajorKey));
    setMajor(targetMajor ?? null);
  }, [setMajor, selectedMajorKey, majors]);


  return (
    <section className={style.page.base}>
      <SignInModal
        description={
          <p>
            비밀번호를<br />
            정확히 입력해주세요.
          </p>
        }
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <p className={"my-8 text-center text-pink-500"}>
        인증 완료!!<br/>
        다른 친구들에게 본인을 소개해보세요!
      </p>
      <section className={"flex-1 flex flex-col space-y-4"}>
        <InformationInput
          label={"닉네임"}
          value={nickname}
          setValue={setNickname}
          type={"text"}
          required={true}
        />
        <InformationInput
          label={"비밀번호"}
          value={password}
          setValue={setPassword}
          type={"text"}
          required={true}
          isPassword={true}
        />
        <InformationInput
          label={"비밀번호 확인"}
          value={passwordCheck}
          setValue={setPasswordCheck}
          type={"text"}
          required={true}
          isPassword={true}
        />
        <InformationInput
          label={"생년월일"}
          value={birthday}
          setValue={setBirthday}
          type={"date"}
          required={true}
        />
        <InformationInput
          label={"단과대"}
          value={selectedCollegeKey}
          setValue={setSelectedCollegeKey}
          type={"select"}
          required={true}
          options={
            colleges.map((col) => ({ name: col.name, value: col.key }))
          }
        />
        <InformationInput
          label={"학과"}
          value={selectedMajorKey}
          setValue={setSelectedMajorKey}
          type={"select"}
          required={true}
          options={
            majors.map((m) => ({ name: m.name, value: m.key }))
          }
        />
        <InformationInput
          label={"성별"}
          value={gender}
          setValue={setGender}
          type={"select"}
          required={true}
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
          required={true}
          options={[
            { name: "남자", value: Gender.MALE },
            { name: "여자", value: Gender.FEMALE },
            { name: "상관없음", value: Gender.ALL },
          ]}
        />
      </section>
      <section className={style.component.signIn.buttonWrapper}>
        <button
          className={`${style.button.base} ${style.button.colorSet.secondary} mb-2`}
          onClick={backOnClick}
        >
          뒤로 가기
        </button>
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
