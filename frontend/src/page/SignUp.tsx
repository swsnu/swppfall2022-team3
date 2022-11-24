import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import EmailVerification from "../component/signup/EmailVerification";
import ImageUpload from "../component/signup/ImageUpload";
import Introduction from "../component/signup/Introduction";
import PersonalInformation from "../component/signup/PersonalInformation";
import TagSelect from "../component/signup/TagSelect";
import UniversitySelect from "../component/signup/UniversitySelect";
import paths from "../constant/path";
import style from "../constant/style";
import { selectUser } from "../store/slices/user";
import { College, Gender, Major, Tag, University } from "../types";


export default function SignUp() {
  const loginUser = useSelector(selectUser).loginUser;
  const [step, setStep] = useState<number>(3);
  const [university, setUniversity] = useState<University | null>(null);
  const [requestTime, setRequestTime] = useState<Date>(new Date());
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [college, setCollege] = useState<College | null>(null);
  const [major, setMajor] = useState<Major | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [interestedGender, setTargetGender] = useState<Gender>(Gender.ALL);
  const [tags, setTags] = useState<Tag[]>([]);
  const [introduction, setIntroduction] = useState<string>("");
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) {
      navigate(paths.search);
    }
  }, [navigate, loginUser]);

  const confirmOnClick = useCallback(async () => {
    const user = await axios.post("/user/", {
      email: email,
      password: password,
      phone: "",  // FIXME
      nickname: nickname,
      gender: gender,
      interested_gender: interestedGender,
      birthday: birthday,
      university: university?.key,
      college: college?.key,
      major: major?.key,
      introduction: introduction,
      tags: tags.map((tag) => tag.key),
    });
    await axios.post("/photo/", {
      user: user.data.key,
      name: uploadedPhotos[0],
    });
    // if (university && college && major && birthday) {
    navigate("/signin");
    // }
  }, [
    navigate,
    university,
    email,
    password,
    nickname,
    gender,
    interestedGender,
    birthday,
    college,
    major,
    introduction,
    tags,
    uploadedPhotos,
  ]);

  const getPage = useCallback((step: number): JSX.Element => {
    switch (step) {
    case 0:
      return <UniversitySelect
        university={university}
        email={email}
        requestTime={requestTime}
        setUniversity={setUniversity}
        setEmail={setEmail}
        setStep={setStep}
      />;
    case 1:
      return <EmailVerification
        email={email}
        requestTime={requestTime}
        setRequestTime={setRequestTime}
        limitSec={3 * 60}
        setStep={setStep}
      />;
    case 2:
      return <PersonalInformation
        nickname={nickname}
        setUsername={setNickname}
        password={password}
        setPassword={setPassword}
        birthday={birthday}
        setBirthday={setBirthday}
        university={university}
        college={college}
        setCollege={setCollege}
        major={major}
        setMajor={setMajor}
        gender={gender}
        setGender={setGender}
        targetGender={interestedGender}
        setTargetGender={setTargetGender}
        setStep={setStep}
      />;
    case 3:
      return <TagSelect
        tags={tags}
        setTags={setTags}
        setStep={setStep}
      />;
    case 4:
      return <Introduction
        introduction={introduction}
        setIntroduction={setIntroduction}
        setStep={setStep}
      />;
    case 5:
      return <ImageUpload
        uploadedPhotos={uploadedPhotos}
        setUploadedPhotos={setUploadedPhotos}
        setStep={setStep}
      />;
    case 6:
      return (
        <section className={style.page.base}>
          <p className={`text-center text-${style.color.main}`}>
            프로필 작성 완료!<br/>
            다른 사람들의 프로필을 구경하고<br/>
            마음에 드는 상대에게 &apos;두근&apos;을 보내보세요
          </p>
          <button
            className={`${style.button.base} ${style.button.colorSet.main} mt-16`}
            onClick={confirmOnClick}
          >
            완료
          </button>
        </section>
      );
    default:
      return <section/>;
    }
  }, [
    requestTime,
    university,
    email,
    nickname,
    password,
    birthday,
    college,
    major,
    gender,
    interestedGender,
    tags,
    introduction,
    uploadedPhotos,
    confirmOnClick,
  ]);

  return getPage(step);
}
