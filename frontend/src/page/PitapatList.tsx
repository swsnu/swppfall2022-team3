import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import path from "../constant/path";
import { selectUser } from "../store/slices/user";
import { selectPitapat } from "../store/slices/pitapat";
import { selectPhoto } from "../store/slices/photo";
import { getKoreanAge, PitapatStatus, User } from "../types";
import { getPitapatStatus } from "../util/getPitapatStatus";


export default function PitapatList() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;
  const pitapats = useSelector(selectPitapat).pitapats;
  const photos = useSelector(selectPhoto).photos;
  const [isRecvPage, setIsRecvPage] = useState<boolean>(true);

  useEffect(() => {
    if (loginUser === null) {
      navigate(path.signIn);
    }
  }, [navigate, loginUser]);

  return (
    loginUser ?
      <section className={"w-full flex flex-col mt-24 mb-16"}>
        <AppBar title={"두근두근 캠퍼스"}/>
        <section className={"top-12 w-full flex flex-row h-12 z-10 fixed bg-white"}>
          <button
            className={`flex-1 border font-bold ${isRecvPage ? "border-pink-300 text-pink-500" : "border-gray-400 text-gray-400"}`}
            disabled={isRecvPage}
            onClick={() => setIsRecvPage(true)}
          >
          내가 받은 두근
          </button>
          <button
            className={`flex-1 border font-bold ${isRecvPage ? "border-gray-400 text-gray-400" : "border-pink-300 text-pink-500"}`}
            disabled={!isRecvPage}
            onClick={() => setIsRecvPage(false)}
          >
          내가 보낸 두근
          </button>
        </section>
        {
          isRecvPage ?
            <section>
              {pitapats.filter((p) =>
                (p.to === loginUser.key) && (getPitapatStatus(loginUser.key, p.from, pitapats) !== PitapatStatus.MATCHED)
              ).map((p) => {
                const from: User = users.find(user => user.key === p.from)!;
                return (
                  <Profile
                    key={from.key}
                    myKey={loginUser.key}
                    userKey={from.key}
                    username={from.username}
                    koreanAge={getKoreanAge(from.birthday)}
                    photo={photos.find((p) => p.key === from.photos[0])?.path!}
                    status={getPitapatStatus(loginUser.key, from.key, pitapats)}
                  />
                );
              })}
            </section>
            :
            <section>
              {pitapats.filter((p) =>
                (p.from === loginUser.key) && (getPitapatStatus(loginUser.key, p.to, pitapats) !== PitapatStatus.MATCHED)
              ).map((p) => {
                const to: User = users.find(user => user.key === p.to)!;
                return (
                  <Profile
                    key={to.key}
                    myKey={loginUser.key}
                    userKey={to.key}
                    username={to.username}
                    koreanAge={getKoreanAge(to.birthday)}
                    photo={photos.find((p) => p.key === to.photos[0])?.path!}
                    status={getPitapatStatus(loginUser.key, to.key, pitapats)}
                  />
                );
              })}
            </section>
        }
        <NavigationBar/>
      </section> : <section></section>
  );
}
