import { getKoreanAge, PitapatStatus, User } from '../types';
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { selectPhoto } from "../store/slices/photo";
import { selectPitapat } from "../store/slices/pitapat";


export default function Search() {
  const myKey = 1;
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const pitapats = useSelector(selectPitapat).pitapats;

  function getpitapatStatus(user: User): PitapatStatus {
    const sended = pitapats.filter((p) => (p.from === myKey) && (p.to === user?.key)).length > 0;
    const received = pitapats.filter((p) => (p.from === user?.key) && (p.to === myKey)).length > 0;
    if (sended && received) { return PitapatStatus.MATCHED; }
    else if (sended) { return PitapatStatus.SENDED; }
    else if (received) { return PitapatStatus.RECEIVED; }
    else { return PitapatStatus.NONE; }
  }

  return (
    <section className={"mt-12 mb-16 w-full"}>
      <AppBar/>
      <section>
        {users.map((user) => {
          return (
            <Profile
              myKey={myKey}
              userKey={user.key}
              username={user.username}
              koreanAge={getKoreanAge(user.birthday)}
              photo={photos.find((p) => p.key === user.photos[0])?.path!}
              status={getpitapatStatus(user)}
            />
          );
        })}
      </section>
      <NavigationBar/>
    </section>
  );
}
