import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import Profile from "../component/Profile";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getUsers, selectUser } from "../store/slices/user";
import { User } from "../types";
import { getKoreanAge } from "../util/getKoreanAge";
import { getPitapatStatus } from "../util/getPitapatStatus";


export default function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
    else {
      dispatch(getUsers());
    }

  }, [navigate, loginUser, dispatch]);

  const getNoneStatusProfiles = useCallback((loginUser: User) => {
    return users.map((user, index) => {
      return (
        <Profile
          key={user.key}
          user={user}
          nickname={user.nickname}
          koreanAge={getKoreanAge(user.birthday)}
          showRejectButton={false}
          isLastElement={(index === users.length - 1)}
          status={getPitapatStatus(loginUser.key, user.key, [])}
        />
      );
    });
  }, [users]);

  return (
    loginUser ?
      <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
        <AppBar/>
        <section className="h-fit pb-[56px] overflow-y-scroll">
          {getNoneStatusProfiles(loginUser)}
        </section>
        <NavigationBar/>
      </section> : <section/>
  );
}
