import React, { useState } from "react";
import { College, Gender, Major, Tag, University } from "../types";
import UniversityCheck from "../component/signup/UniversityCheck";
import EmailVerification from "../component/signup/EmailVerification";
import PersonalInformation from "../component/signup/PersonalInformation";
import CreateTag from "../component/signup/CreateTag";
import Introduction from "../component/signup/Introduction";
import ImageUpload from "../component/signup/ImageUpload";
import Completed from "../component/signup/Completed";


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
      <Completed
      /> :
      // default component..  but shouldn't be reached here.
      <UniversityCheck
        university={university}
        setUniversity={setUniversity}
        email={email}
        setEmail={setEmail}
        setVerificationCode={setVerificationCode}
        setStep={setStep}
      />
  )
}
