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
import { getPitapatStatus } from "../util/getPitapatStatus";
import {Navigate} from "react-router-dom";
import path from "../constant/path";


export default function ProfileDetail() {
  const loginUser = useSelector(selectUser).loginUser;
  const myKey = loginUser?.key ?? null;
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const pitapats = useSelector(selectPitapat).pitapats;
  const tags = useSelector(selectTag).tags;
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(users.find((user) => user.key === Number(id)));
  }, [id, users]);

  if (myKey === null) {
    return <Navigate to={path.signIn} />;
  }
  else {
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
            <div className={"absolute h-14 bottom-0 left-0 right-0 px-4 py-2 flex flex-col justify-center"}>
              <PitapatButton
                from={myKey}
                to={user.key}
                status={getPitapatStatus(user, myKey, pitapats)}
                isListView={false}
              />
            </div>
          </section>
          <article className={"flex flex-wrap mx-1.5 my-2 text-base font-bold text-pink-500"}>
            {user.tags.map((t, index) =>
              <div key={index} className={"flex-none px-2.5 py-0.5 mx-1 my-1 rounded-2xl border-2 border-pink-400"}>
                {tags.find((tag) => tag.key === t)?.name}
              </div>
            )}
          </article>
          <article className={"mx-3 mb-6 text-base"}>{user.introduction}</article>
        </section>
      </section>

    ) : <section></section>;
  }
}
