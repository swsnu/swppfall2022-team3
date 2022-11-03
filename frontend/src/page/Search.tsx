import { useNavigate } from "react-router-dom";
import { photos, fakeBaseUsers } from '../DummyData';
import { getKoreanAge, Page } from '../types';
import Profile from "../component/Profile";
import NavigationBar from "../component/NavigationBar";
import AppBar from "../component/AppBar";
//import { fetchUsers, fetchUser } from "../store/slices/user";
// import { AppDispatch } from "../store";

export default function Search() {
  const navigate = useNavigate();

  const clickUserHandler = (key : number) => {
    navigate("/profile/" + key);
  };

  return (
    <div id='search'>
      <AppBar page={Page.SEARCH} title='두근두근 캠퍼스'/>
      <div id="user-list">
        {fakeBaseUsers.map((user) => {
          return (
            <Profile
              key={user.key}
              username={user.username}
              koreanAge={getKoreanAge(user.birthday)}
              photo={photos.find((p) => p.key === user.reprPhoto)?.path}
              clickDetail={() => clickUserHandler(user.key)}
            />
          );
        })}
      </div>
      <NavigationBar selectedPath={1}/>
    </div>
  );
}
