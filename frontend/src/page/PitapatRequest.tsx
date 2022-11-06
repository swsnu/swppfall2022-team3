import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getKoreanAge, User } from "../types";
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPitapat } from "../store/slices/pitapat";
import { selectPhoto } from "../store/slices/photo";


export default function PitapatRequest() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const pitapats = useSelector(selectPitapat).pitapats;
  const photos = useSelector(selectPhoto).photos;
  const [isRecvPage, setIsRecvPage] = useState<boolean>(true);

  return (
    <section className="w-full flex flex-col mt-12 mb-16">
      <AppBar title={"두근두근 캠퍼스"}/>
      {isRecvPage ?
        <section className="flex flex-row h-10">
          <button className="flex-1 border border-pink-300 bg-pink-300 font-bold text-white"
                  disabled={isRecvPage}
                  onClick={() => setIsRecvPage(true)}
          >
            내가 받은 두근
          </button>
          <button className="flex-1 border border-pink-300 font-bold text-pink-500"
                  disabled={!isRecvPage}
                  onClick={() => setIsRecvPage(false)}
          >
            내가 보낸 두근
          </button>
        </section>
        :
        <section className="flex flex-row h-10">
          <button className="flex-1 border border-pink-300 font-bold text-pink-500"
          disabled={isRecvPage}
          onClick={() => setIsRecvPage(true)}
          >
          내가 받은 두근
          </button>
          <button className="flex-1 border border-pink-300 bg-pink-300 font-bold text-white"
          disabled={!isRecvPage}
          onClick={() => setIsRecvPage(false)}
          >
          내가 보낸 두근
          </button>
        </section>
      }
      {
        isRecvPage ?
        <section>
          {pitapats.filter(pitapat => pitapat.to === 1).map((pitapat) => {
            const from: User = users.find(user => user.key === pitapat.from)!;
            return (
              <Profile
                key={from.key}
                username={from.username}
                koreanAge={getKoreanAge(from.birthday)}
                photo={photos.find((p) => p.key === from.photos[0])?.path!}
                clickDetail={() => navigate("/profile/" + from.key)}
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
                key={to.key}
                username={to.username}
                koreanAge={getKoreanAge(to.birthday)}
                photo={photos.find((p) => p.key === to.photos[0])?.path!}
                clickDetail={() => navigate("/profile/" + to.key)}
              />
            )
          })}
        </section>
      }
      <NavigationBar/>
    </section>
  );
}
