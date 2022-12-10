import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import paths from "../constant/path";
import { AppDispatch } from "../store";
import { getUser, selectUser } from "../store/slices/user";
import { User } from "../types";
import { getKoreanAge } from "../util/date";
import PitapatButton from "./PitapatButton";


export interface IProps {
  user: User;
  showRejectButton: boolean;
  isLastElement: boolean;
}

export default function Profile({
  user,
  showRejectButton,
  isLastElement,
}: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;

  const profileOnClick = useCallback(async () => {
    await dispatch(getUser(user.key));
    navigate(paths.profile);
  }, [navigate, user.key, dispatch]);

  return (
    loginUser ?
      (
        <article className={`relative h-[100vw] ${isLastElement ? "" : "mb-2"}`} data-testid={"profile"}>
          <button
            onClick={profileOnClick}
            className={"w-full z-0"}
          >
            <img
              src={user.photos[0]}
              alt={user.photos[0]}
              className={"object-cover w-full h-[100vw]"}
            />
          </button>
          <div
            className={"absolute h-14 bottom-0 left-0 right-0 px-4 py-2 flex flex-col justify-center"}
            style={{
              background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)",
            }}
          >
            <div className={"flex flex-row items-center"}>
              <div className={"flex-none w-16"}>
                {
                  showRejectButton ?
                    <PitapatButton
                      from={loginUser.key}
                      to={user.key}
                      isAccept={false}
                      isListView={true}
                    /> :
                    null
                }
              </div>
              <div className={"flex-auto truncate flex flex-col text-center text-white text-lg font-bold"}>
                <div className={"flex-none mx-2 truncate"}>{user.nickname}/{getKoreanAge(user.birthday)}</div>
              </div>
              <div className={"flex-none w-16"}>
                <PitapatButton
                  from={loginUser.key}
                  to={user.key}
                  isAccept={true}
                  isListView={true}
                />
              </div>
            </div>
          </div>
        </article>
      ) :
      <Navigate replace to={paths.signIn}/>
  );
}
