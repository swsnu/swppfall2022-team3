import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../store";
import { getBlockedUsers } from "../store/slices/user";


interface IProps {
  fromUserKey: number;
  toUserKey: number;
  userName: string;
  imagePath: string;
}

export default function BlockedUserElement({
  fromUserKey,
  toUserKey,
  userName,
  imagePath,
}: IProps) {

  const dispatch = useDispatch<AppDispatch>();

  const elementOnClick = useCallback(async () => {
    await axios.delete("/api/block/", { data: {
      from: fromUserKey,
      to: toUserKey
    } });
    dispatch(getBlockedUsers(fromUserKey));
  }, [dispatch, fromUserKey, toUserKey]);

  return (
    <article
      className={"w-full h-20 flex flex-row items-center border-b-2 border-b-gray-300"}
      role={"presentation"}
    >
      <img
        className={"w-16 h-16 m-2 bg-blue-100 rounded-full"}
        alt={"프로필 사진"}
        src={imagePath}
      />
      <article
        className={"flex-1 flex flex-col h-full pl-2 w-0"}
      >
        <article className={"basis-1/4 pt-2 font-bold text-lg"}>{userName}</article>
      </article>
      <button
        className={"mr-4 w-16 h-8 z-10 bg-white rounded-lg border border-pink-600 flex items-center justify-center"}
        onClick={elementOnClick}
      >
        <div className={"flex-none text-sm mx-1.5 font-bold text-pink-600"}>
          차단 풀기
        </div>
      </button>
    </article>
  );
}
