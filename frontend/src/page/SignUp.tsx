import * as React from "react";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import Completed from "../component/signup/Completed";
import CreateTag from "../component/signup/CreateTag";
import EmailVerification from "../component/signup/EmailVerification";
import ImageUpload from "../component/signup/ImageUpload";
import Introduction from "../component/signup/Introduction";
import PersonalInformation from "../component/signup/PersonalInformation";
import UniversityCheck from "../component/signup/UniversityCheck";
import { users } from "../dummyData";
import { AppDispatch } from "../store";
import { userActions } from "../store/slices/user";
import { College, Gender, Major, Tag, University } from "../types";


export default function SignUp() {
  const [step, setStep] = useState<number>(0);
  const [university, setUniversity] = useState<University | null>(null);
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [college, setCollege] = useState<College | null>(null);
  const [major, setMajor] = useState<Major | null>(null);
  const [gender, setGender] = useState<Gender>(Gender.MALE);
  const [targetGender, setTargetGender] = useState<Gender>(Gender.ALL);
  const [tags, setTags] = useState<Tag[]>([]);
  const [introduction, setIntroduction] = useState<string>("");
  // not photo, they are image files yet
  const [images, setImages] = useState<File[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const confirmOnClick = useCallback(() => {
    const tagsKey = tags.map((tag) => tag.key);
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
          tags: tagsKey,
          photos: [13, 14]
        }
      ));
      navigate("/signin");
    }
  }, [dispatch, birthday, college, email, gender, introduction, major, navigate, nickname, tags, university]);

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
                  images={images}
                  setImages={setImages}
                  setStep={setStep}
                /> :
                step === 6 ?
                  <section className="h-screen w-full flex flex-col mt-48 mb-16">
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
