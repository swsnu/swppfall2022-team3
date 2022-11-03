import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';
import { fakeUsers } from '../data';
import { getKoreanAge, User } from '../types';
import Profile from "../component/Profile";
import { Navigate } from "react-router-dom";
//import { fetchUsers, fetchUser } from "../store/slices/user";
// import { AppDispatch } from "../store";

export default function Search() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(fakeUsers.find((user) => user.key === Number(id)));
  }, [id]);

  const clickUserHandler = (key : number) => {
    navigate("/profile/" + key);
  };

  return (
    <div className="UserList">
      <div className="users">
        {fakeUsers.map((us) => {
          return (
            <Profile
              key={us.key}
              username={us.username}
              koreanAge={getKoreanAge(us.birthday)}
              photo={us.reprPhoto}
              clickDetail={() => clickUserHandler(us.key)}
            />
          );
        })}
      </div>
    </div>
  );
}
