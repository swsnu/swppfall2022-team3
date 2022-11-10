import * as React from "react";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import Profile from "../component/Profile";
import paths from "../constant/path";
import { selectPhoto } from "../store/slices/photo";
import { selectPitapat } from "../store/slices/pitapat";
import { selectUser } from "../store/slices/user";
import { PitapatStatus, User } from "../types";
import { getKoreanAge } from "../util/getKoreanAge";
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

  const getNoneStatusProfiles = useCallback((loginUser: User) => {
    const showUsers = users.filter((user) =>
      (user.key !== loginUser.key) && (getPitapatStatus(loginUser.key, user.key, pitapats) === PitapatStatus.NONE)
    );
    return showUsers.map((user, index) => {
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
          isLastElement={(index === showUsers.length - 1) ? true : false}
          status={getPitapatStatus(loginUser.key, user.key, pitapats)}
        />
      );
    });
  }, [users, photos, pitapats]);

  return (
    loginUser ?
      <section className={"mt-12 w-full"}>
        <AppBar/>
        <section className="h-fit pb-[56px]">
          {getNoneStatusProfiles(loginUser)}
        </section>
        <NavigationBar/>
      </section> : <section></section>
  );
}
