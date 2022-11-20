import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import NavigationBar from "../component/NavigationBar";
import Profile from "../component/Profile";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getUsers, selectUser } from "../store/slices/user";


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

  return (
    loginUser ?
      <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
        <AppBar/>
        <section className="h-fit pb-[56px] overflow-y-scroll">
          {
            users.map((user, index) => (
              <Profile
                key={user.key}
                user={user}
                showRejectButton={false}
                isLastElement={(index === users.length - 1)}
              />
            ))
          }
        </section>
        <NavigationBar/>
      </section> : <section/>
  );
}
