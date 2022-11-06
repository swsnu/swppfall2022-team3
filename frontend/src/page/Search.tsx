import { getKoreanAge } from "../types";
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPhoto } from "../store/slices/photo";
import { selectPitapat } from "../store/slices/pitapat";
import path from "../constant/path";
import { getPitapatStatus } from "../util/getPitapatStatus";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export default function Search() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;
  const pitapats = useSelector(selectPitapat).pitapats;
  const photos = useSelector(selectPhoto).photos;

  useEffect(() => {
    if (loginUser === null) {
      navigate(path.signIn);
    }
  }, [navigate, loginUser]);

  return (
    loginUser ?
      <section className={"mt-12 mb-16 w-full"}>
        <AppBar/>
        <section>
          {users.filter(user => user.key !== loginUser.key).map((user) => {
            return (
              <Profile
                key={user.key}
                myKey={loginUser.key}
                userKey={user.key}
                username={user.username}
                koreanAge={getKoreanAge(user.birthday)}
                photo={photos.find((p) => p.key === user.photos[0])?.path!}
                status={getPitapatStatus(loginUser.key, user.key, pitapats)}
              />
            );
          })}
        </section>
        <NavigationBar/>
      </section> : <section></section>
  );
}
