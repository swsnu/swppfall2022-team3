import { useState } from "react";
import { getKoreanAge, PitapatStatus, User } from "../types";
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPitapat } from "../store/slices/pitapat";
import { selectPhoto } from "../store/slices/photo";
import { useNavigate } from "react-router";
import { getPitapatStatus } from "../component/getPitapatStatus";
import path from "../constant/path";
import { Navigate } from "react-router-dom";


export default function PitapatRequest() {
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;
  const myKey = loginUser?.key ?? null;
  const pitapats = useSelector(selectPitapat).pitapats;
  const photos = useSelector(selectPhoto).photos;
  const [isRecvPage, setIsRecvPage] = useState<boolean>(true);
  const navigate = useNavigate();


  if (myKey === null) {
    return <Navigate to={path.signIn} />;
  }
  else {
    return (
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
              {pitapats.filter(pitapat => pitapat.to === myKey).map((pitapat) => {
                const from: User = users.find(user => user.key === pitapat.from)!;
                return (
                  <Profile
                    key={from.key}
                    myKey={myKey}
                    userKey={from.key}
                    username={from.username}
                    koreanAge={getKoreanAge(from.birthday)}
                    photo={photos.find((p) => p.key === from.photos[0])?.path!}
                    status={getPitapatStatus(from, myKey, pitapats)}
                  />
                );
              })}
            </section>
            :
            <section>
              {pitapats.filter(pitapat => pitapat.from === myKey).map((pitapat) => {
                const to: User = users.find(user => user.key === pitapat.to)!;
                return (
                  <Profile
                    key={to.key}
                    myKey={myKey}
                    userKey={to.key}
                    username={to.username}
                    koreanAge={getKoreanAge(to.birthday)}
                    photo={photos.find((p) => p.key === to.photos[0])?.path!}
                    status={getPitapatStatus(to, myKey, pitapats)}
                  />
                )
              })}
            </section>
        }
        <NavigationBar/>
      </section>
    );
  }
}
