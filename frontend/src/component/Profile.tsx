import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import paths from "../constant/path";
import { AppDispatch } from "../store";
import { getUserIntroduction, getUserTags, selectUser, userActions } from "../store/slices/user";
import { PitapatStatus, User } from "../types";
import { getPitapatStatus } from "../util/getPitapatStatus";
import PitapatButton from "./PitapatButton";


export interface IProps {
  user: User;
  nickname: string;
  koreanAge: number;
  showRejectButton: boolean;
  isLastElement: boolean;
  status: PitapatStatus;
}

export default function Profile({
  user,
  nickname,
  koreanAge,
  showRejectButton,
  isLastElement,
  status,
}: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;

  const profileOnClick = useCallback(async () => {
    dispatch(userActions.setInterestedUser(user));
    const functionWrapper = async () => {
      dispatch(getUserTags(user.key));
      dispatch(getUserIntroduction(user.key));
    };
    await functionWrapper();

    navigate(paths.profile);
  }, [navigate, user, dispatch]);

  return (
    loginUser ?
      (<article className={`relative h-[100vw] ${isLastElement ? "" : "mb-2"}`}>
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
                getPitapatStatus(loginUser.key, user.key, []) && showRejectButton ?
                  <PitapatButton
                    from={loginUser.key}
                    to={user.key}
                    pitapatStatus={status}
                    isAccept={false}
                    isListView={true}
                  /> :
                  null
              }
            </div>
            <div className={"flex-auto truncate flex flex-col text-center text-white text-lg font-bold"}>
              <div className={"flex-none mx-2 truncate"}>{nickname}/{koreanAge}</div>
            </div>
            <div className={"flex-none w-16"}>
              <PitapatButton
                from={loginUser.key}
                to={user.key}
                pitapatStatus={status}
                isAccept={true}
                isListView={true}
              />
            </div>
          </div>
        </div>
      </article>) :
      <Navigate replace to={paths.signIn}/>
  );
}
