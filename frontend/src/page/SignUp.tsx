import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios, { AxiosResponse } from "axios";
import EmailVerification from "../component/signup/EmailVerification";
import ImageUpload from "../component/signup/ImageUpload";
import Introduction from "../component/signup/Introduction";
import PersonalInformation from "../component/signup/PersonalInformation";
import TagSelect from "../component/signup/TagSelect";
import UniversitySelect from "../component/signup/UniversitySelect";
import paths from "../constant/path";
import style from "../constant/style";
import { selectUser } from "../store/slices/user";
import { photoUrl, userUrl } from "../store/urls";
import { College, Gender, Major, Tag, University } from "../types";
import { dateToString } from "../util/date";


export default function SignUp() {
  const loginUser = useSelector(selectUser).loginUser;
  const [step, setStep] = useState<number>(0);
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
  const [timeout, setTimeout] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) {
      navigate(paths.search);
    }
  }, [navigate, loginUser]);

  const confirmOnClick = useCallback(async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let user: AxiosResponse<any, any> | undefined;
    try {
      user = await axios.post(`${userUrl}/`, {
        email: email,
        password: password,
        nickname: nickname,
        gender: gender,
        interested_gender: interestedGender,
        birthday: dateToString(birthday),
        university: university?.key,
        college: college?.key,
        major: major?.key,
        introduction: introduction,
        tags: tags.map((tag) => tag.key),
      });
    } catch (_) {
      alert("회원가입에 실패하였습니다.");
    }

    if (user) {
      for (const photo of uploadedPhotos) {
        const form = new FormData();
        form.append("file", photo);
        try {
          await axios.post(`${photoUrl}/user/${user.data.key}/`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Content-Disposition": `form-data; filename=${photo.name};`,
            },
          });
        } catch (_) {
          alert("사진 업로드에 실패하였습니다.");
        }
      }
    }
    navigate("/signin");
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
        timeout={timeout}
        setUniversity={setUniversity}
        setEmail={setEmail}
        setStep={setStep}
      />;
    case 1:
      return <EmailVerification
        email={email}
        requestTime={requestTime}
        limitSec={3 * 60}
        setRequestTime={setRequestTime}
        setTimeout={setTimeout}
        setStep={setStep}
      />;
    case 2:
      return <PersonalInformation
        nickname={nickname}
        setNickname={setNickname}
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
    timeout,
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
    confirmOnClick,
  ]);

  return getPage(step);
}
