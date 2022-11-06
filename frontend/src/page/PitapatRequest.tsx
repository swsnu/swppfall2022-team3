import { useState } from "react";
import { getKoreanAge, PitapatStatus, User } from "../types";
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPitapat } from "../store/slices/pitapat";
import { selectPhoto } from "../store/slices/photo";


export default function PitapatRequest() {
  const myKey = 1;
  const users = useSelector(selectUser).users;
  const pitapats = useSelector(selectPitapat).pitapats;
  const photos = useSelector(selectPhoto).photos;
  const [isRecvPage, setIsRecvPage] = useState<boolean>(true);

  function getpitapatStatus(user: User): PitapatStatus {
    const sended = pitapats.filter((p) => (p.from === myKey) && (p.to === user?.key)).length > 0;
    const received = pitapats.filter((p) => (p.from === user?.key) && (p.to === myKey)).length > 0;
    if (sended && received) { return PitapatStatus.MATCHED; }
    else if (sended) { return PitapatStatus.SENDED; }
    else if (received) { return PitapatStatus.RECEIVED; }
    else { return PitapatStatus.NONE; }
  }

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
            {pitapats.filter(pitapat => pitapat.to === 1).map((pitapat) => {
              const from: User = users.find(user => user.key === pitapat.from)!;
              return (
                <Profile
                  myKey={myKey}
                  userKey={from.key}
                  username={from.username}
                  koreanAge={getKoreanAge(from.birthday)}
                  photo={photos.find((p) => p.key === from.photos[0])?.path!}
                  status={getpitapatStatus(from)}
                />
              );
            })}
          </section>
          :
          <section>
            {pitapats.filter(pitapat => pitapat.from === 1).map((pitapat) => {
              const to: User = users.find(user => user.key === pitapat.to)!;
              return (
                <Profile
                  myKey={myKey}
                  userKey={to.key}
                  username={to.username}
                  koreanAge={getKoreanAge(to.birthday)}
                  photo={photos.find((p) => p.key === to.photos[0])?.path!}
                  status={getpitapatStatus(to)}
                />
              )
            })}
          </section>
      }
      <NavigationBar/>
    </section>
  );
}
