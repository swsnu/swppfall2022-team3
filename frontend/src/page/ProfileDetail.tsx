import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getKoreanAge, PitapatStatus, User } from "../types";
import AppBar from "../component/AppBar";
import PhotoSlider from "../component/PhotoSlider";
import PitapatButton from "../component/PitapatButton";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPhoto } from "../store/slices/photo";
import { selectTag } from "../store/slices/tag";
import { selectPitapat } from "../store/slices/pitapat";


export default function ProfileDetail() {
  const myKey = 1;
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const pitapats = useSelector(selectPitapat).pitapats;
  const tags = useSelector(selectTag).tags;
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(users.find((user) => user.key === Number(id)));
  }, [id, users]);

  function getpitapatStatus(): PitapatStatus {
    const sended = pitapats.filter((p) => (p.from === myKey) && (p.to === user?.key)).length > 0;
    const received = pitapats.filter((p) => (p.from === user?.key) && (p.to === myKey)).length > 0;
    if (sended && received) { return PitapatStatus.MATCHED; }
    else if (sended) { return PitapatStatus.SENDED; }
    else if (received) { return PitapatStatus.RECEIVED; }
    else { return PitapatStatus.NONE; }
  }

  return user ? (
    // add bottom margin if navigation bar is added
    // <section className={"w-full flex-1 flex flex-col mt-12 mb-16"}>
    <section className={"flex-1 w-full mt-12 flex flex-col"}>
      <AppBar title={`${user.username}/${getKoreanAge(user.birthday)}`}/>
      <section className={"w-full flex-1 z-0 flex flex-col"}>
        <section className={"relative"}>
          <PhotoSlider
            user={user}
            photos={photos}
          />
          <PitapatButton
            status={getpitapatStatus()}
            from={myKey}
            to={user.key}
          />
        </section>
        <article className="flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500">
          {user.tags.map((t, index) =>
            <div key={index} className="flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400">
              {tags.find((tag) => tag.key === t)?.name}
            </div>
          )}
        </article>
        <article className="mx-3 mb-6 text-base">{user.introduction}</article>
      </section>
    </section>

  ) : <section></section>;
}
