import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import CreateTag from "../component/signup/CreateTag";
import EmailVerification from "../component/signup/EmailVerification";
import ImageUpload from "../component/signup/ImageUpload";
import Introduction from "../component/signup/Introduction";
import PersonalInformation from "../component/signup/PersonalInformation";
import UniversityCheck from "../component/signup/UniversityCheck";
import paths from "../constant/path";
import { AppDispatch } from "../store";
// import { selectPhoto } from "../store/slices/photo";
import { selectUser, userActions } from "../store/slices/user";
import { College, Gender, Major, Tag, University } from "../types";


export default function SignUp() {
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;
  // const photos = useSelector(selectPhoto).photos;
  const [step, setStep] = useState<number>(0);
  const [university, setUniversity] = useState<University | null>(null);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [college, setCollege] = useState<College | null>(null);
  const [major, setMajor] = useState<Major | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [targetGender, setTargetGender] = useState<Gender>(Gender.ALL);
  const [tags, setTags] = useState<Tag[]>([]);
  const [introduction, setIntroduction] = useState<string>("");
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) {
      navigate(paths.search);
    }
  }, [navigate, loginUser]);

  const confirmOnClick = useCallback(() => {
    // DO NOT DELETE: will be used with real server
    // uploadedPhotos.forEach((photo) => {
    //   const key = photos.length + 1;
    //   const temp = (photo as File).name.split(".");
    //   const extension = temp[temp.length - 1];
    //   const filename = `photo${key}.${extension}`;
    //   dispatch(photoActions.add({
    //     key: key,
    //     index: 1,
    //     path: filename,
    //   }));
    //   // TODO: save image in server
    // });

    const tagKeys = tags.map((tag) => tag.key);
    if (university && college && major && birthday) {
      dispatch(userActions.add(
        {
          key: users.length + 1,
          email,
          username: username,
          gender,
          targetGender,
          birthday,
          location: "관악구",
          university: university.key,
          college: college.key,
          major: major.key,
          introduction,
          tags: tagKeys,
          photos: [13, 14]
        }
      ));
      navigate("/signin");
    }
  }, [
    dispatch,
    navigate,
    users,
    university,
    email,
    username,
    birthday,
    college,
    major,
    gender,
    targetGender,
    tags,
    introduction,
  ]);

  const getPage = useCallback((step: number): JSX.Element => {
    switch (step) {
    case 0:
      return <UniversityCheck
        university={university}
        setUniversity={setUniversity}
        email={email}
        setEmail={setEmail}
        setVerificationCode={setVerificationCode}
        setStep={setStep}
      />;
    case 1:
      return <EmailVerification
        email={email}
        verificationCode={verificationCode}
        setVerificationCode={setVerificationCode}
        setStep={setStep}
      />;
    case 2:
      return <PersonalInformation
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        birthday={birthday}
        setBirthday={setBirthday}
        college={college}
        setCollege={setCollege}
        major={major}
        setMajor={setMajor}
        gender={gender}
        setGender={setGender}
        targetGender={targetGender}
        setTargetGender={setTargetGender}
        setStep={setStep}
      />;
    case 3:
      return <CreateTag
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
        <section className="w-full flex flex-col mt-64 mb-16">
          <p className="text-center text-pink-500/100 mt-6">
            프로필 작성 완료!<br/>
            다른 사람들의 프로필을 구경하고<br/>
            마음에 드는 상대에게 &apos;두근&apos;을 보내보세요
          </p>
          <div className={"text-center"}>
            <button
              className={"bg-pink-500 text-center text-white mt-16 w-36 h-12 rounded-md"}
              onClick={confirmOnClick}
            >
              완료
            </button>
          </div>
        </section>
      );
    default:
      return <section></section>;
    }
  }, [
    university,
    verificationCode,
    email,
    username,
    password,
    birthday,
    college,
    major,
    gender,
    targetGender,
    tags,
    introduction,
    uploadedPhotos,
    confirmOnClick,
  ]);

  return getPage(step);
}
