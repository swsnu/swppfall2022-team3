import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import AppBar from "../component/AppBar";
import PhotoSlider from "../component/PhotoSlider";
import PitapatButton from "../component/PitapatButton";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { selectChat } from "../store/slices/chat";
import { getColleges, selectCollege } from "../store/slices/college";
import { getMajors, selectMajor } from "../store/slices/major";
import { getTags, selectTag } from "../store/slices/tag";
import { selectUser } from "../store/slices/user";
import { getKoreanAge } from "../util/date";


export default function ProfileDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const interestingUser = useSelector(selectUser).interestingUser;
  const chatroomParticipants = useSelector(selectChat).chatrooms;
  const isChatroomParticipant = (chatroomParticipants.findIndex(
    participant => participant.name === interestingUser?.nickname
  ) >= 0) ? true : false;
  const senders = useSelector(selectUser).pitapat.senders;
  const showRejectButton = (senders.findIndex(
    sender => sender.key === interestingUser?.key
  ) >= 0) ? true : false;
  const tags = useSelector(selectTag).tags;
  const colleges = useSelector(selectCollege).colleges;
  const majors = useSelector(selectMajor).majors;

  useEffect(() => {
    if (interestingUser) {
      const tagKeys = tags.map((tag) => tag.key);
      const shouldGetTags =
        interestingUser.tags
          .reduce(
            (acc, tagKey) => (acc || (tagKeys.indexOf(tagKey) < 0)),
            false,
          );
      if (shouldGetTags) {
        dispatch(getTags());
      }

      const collegeKeys = colleges.map((college) => college.key);
      const shouldGetColleges = collegeKeys.indexOf(interestingUser.college) < 0;
      if (shouldGetColleges) {
        dispatch(getColleges(interestingUser.university));
      }

      const majorKeys = majors.map((major) => major.key);
      const shouldGetMajors = majorKeys.indexOf(interestingUser.major) < 0;
      if (shouldGetMajors) {
        dispatch(getMajors(interestingUser.college));
      }
    }
  }, [interestingUser, tags, colleges, majors, dispatch]);

  return (loginUser && interestingUser) ? (
    <section className={`${style.page.base} ${style.page.margin.top}`}>
      <AppBar title={`${interestingUser.nickname}/${getKoreanAge(interestingUser.birthday)}`}/>
      <section className={"w-full flex-1 z-0 flex flex-col"}>
        <section className={"relative"}>
          <PhotoSlider
            user={interestingUser}
          />
          {showRejectButton ?
            <div className={"absolute h-14 bottom-0 left-0 right-0 px-4 py-2 flex flex-col justify-center"}>
              <PitapatButton
                from={loginUser.key}
                to={interestingUser.key}
                isAccept={false}
                isListView={true}
              />
            </div> :
            null
          }
          {isChatroomParticipant ?
            null :
            <div className={"absolute h-14 bottom-0 left-0 right-0 px-4 py-2 flex flex-col justify-center"}>
              <PitapatButton
                from={loginUser.key}
                to={interestingUser.key}
                isAccept={true}
                isListView={false}
              />
            </div>
          }
        </section>
        <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
          <div className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
            {colleges.find((college) => college.key === interestingUser.college)?.name}
          </div>
          <div className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
            {majors.find((major) => major.key === interestingUser.major)?.name}
          </div>
        </article>
        <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
          {interestingUser.tags.map((t, index) =>
            <div key={index} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
              {tags.find((tag) => tag.key === t)?.name}
            </div>
          )}
        </article>
        <article className={"mx-3 mb-6 text-base"}>{interestingUser.introduction}</article>
      </section>
    </section>
  ) :
    (!loginUser)?
      <Navigate replace to={paths.signIn}/> :
      <Navigate replace to={paths.search}/>;
}
