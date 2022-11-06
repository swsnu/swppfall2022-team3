import { getKoreanAge, PitapatStatus, User } from '../types';
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPhoto } from "../store/slices/photo";
import { selectPitapat } from "../store/slices/pitapat";
import path from "../constant/path";
import { getPitapatStatus } from "../util/getPitapatStatus";
import { Navigate } from "react-router-dom";


export default function Search() {
  const loginUser = useSelector(selectUser).loginUser;
  const myKey = loginUser?.key ?? null;
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const pitapats = useSelector(selectPitapat).pitapats;


  if (myKey === null) {
    return <Navigate to={path.signIn} />;
  }
  else {
    return (
      <section className={"mt-12 mb-16 w-full"}>
        <AppBar/>
        <section>
          {users.filter(user => user.key !== myKey).map((user) => {
            return (
              <Profile
                key={user.key}
                myKey={myKey}
                userKey={user.key}
                username={user.username}
                koreanAge={getKoreanAge(user.birthday)}
                photo={photos.find((p) => p.key === user.photos[0])?.path!}
                status={getPitapatStatus(user, myKey, pitapats)}
              />
            );
          })}
        </section>
        <NavigationBar/>
      </section>
    );
  }
}
