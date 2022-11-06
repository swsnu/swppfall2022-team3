import { useNavigate } from "react-router-dom";
import { getKoreanAge } from '../types';
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPhoto } from "../store/slices/photo";


export default function Search() {
  const navigate = useNavigate();
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;

  const clickUserHandler = (key : number) => {
    navigate("/profile/" + key);
  };

  return (
    <section className={"mt-12 mb-16 w-full"}>
      <AppBar/>
      <section>
        {users.map((user) => {
          return (
            <Profile
              key={user.key}
              username={user.username}
              koreanAge={getKoreanAge(user.birthday)}
              photo={photos.find((p) => p.key === user.photos[0])?.path!}
              clickDetail={() => clickUserHandler(user.key)}
            />
          );
        })}
      </section>
      <NavigationBar/>
    </section>
  );
}
