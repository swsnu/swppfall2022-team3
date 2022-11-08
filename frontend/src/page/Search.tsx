import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import Profile from "../component/Profile";
import paths from "../constant/path";
import { selectPhoto } from "../store/slices/photo";
import { selectPitapat } from "../store/slices/pitapat";
import { selectUser } from "../store/slices/user";
import { getKoreanAge, PitapatStatus } from "../types";
import { getPitapatStatus } from "../util/getPitapatStatus";


export default function Search() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;
  const pitapats = useSelector(selectPitapat).pitapats;
  const photos = useSelector(selectPhoto).photos;

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
  }, [navigate, loginUser]);

  return (
    loginUser ?
      <section className={"mt-12 mb-16 w-full"}>
        <AppBar/>
        <section>
          {users.filter((user) =>
            (user.key !== loginUser.key) && (getPitapatStatus(loginUser.key, user.key, pitapats) === PitapatStatus.NONE)
          ).map((user) => {
            const photo = photos.find((p) => p.key === user.photos[0]);
            return (
              <Profile
                key={user.key}
                myKey={loginUser.key}
                userKey={user.key}
                username={user.username}
                koreanAge={getKoreanAge(user.birthday)}
                photo={photo ? photo.path : ""}
                showRejectButton={false}
                status={getPitapatStatus(loginUser.key, user.key, pitapats)}
              />
            );
          })}
        </section>
        <NavigationBar/>
      </section> : <section></section>
  );
}
