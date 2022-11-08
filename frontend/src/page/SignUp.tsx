import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Completed from "../component/signup/Completed";
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
  const [step, setStep] = useState<number>(5);
  const [university, setUniversity] = useState<University | null>(null);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
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
          username: nickname,
          gender,
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
  }, [dispatch, navigate, users, birthday, college, email, gender, introduction, major, nickname, tags, university]);

  return (
    step === 0 ?
      <UniversityCheck
        university={university}
        setUniversity={setUniversity}
        email={email}
        setEmail={setEmail}
        setVerificationCode={setVerificationCode}
        setStep={setStep}
      /> :
      step === 1 ?
        <EmailVerification
          email={email}
          verificationCode={verificationCode}
          setVerificationCode={setVerificationCode}
          setStep={setStep}
        /> :
        step === 2 ?
          <PersonalInformation
            nickname={nickname}
            setNickname={setNickname}
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
          /> :
          step === 3 ?
            <CreateTag
              tags={tags}
              setTags={setTags}
              setStep={setStep}
            /> :
            step === 4 ?
              <Introduction
                introduction={introduction}
                setIntroduction={setIntroduction}
                setStep={setStep}
              /> :
              step === 5 ?
                <ImageUpload
                  uploadedPhotos={uploadedPhotos}
                  setUploadedPhotos={setUploadedPhotos}
                  setStep={setStep}
                /> :
                step === 6 ?
                  <section className="w-full flex flex-col mt-64 mb-16">
                    <Completed
                    />
                    <div className={"text-center"}>
                      <button
                        className={"bg-pink-500 text-center text-white mt-16 w-36 h-12 rounded-md"}
                        onClick={confirmOnClick}
                      >
                        완료
                      </button>
                    </div>
                  </section>
                  :
                  // default component.. but shouldn't be reached here.
                  <UniversityCheck
                    university={university}
                    setUniversity={setUniversity}
                    email={email}
                    setEmail={setEmail}
                    setVerificationCode={setVerificationCode}
                    setStep={setStep}
                  />
  );
}
