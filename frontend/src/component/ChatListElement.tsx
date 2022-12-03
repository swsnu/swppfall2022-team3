import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import paths from "../constant/path";
import { AppDispatch } from "../store";
import {getChatParticipants, getUser, selectUser} from "../store/slices/user";
import { User } from "../types";
import encryptor from "../util/encryptor";


interface IProps {
  chatroomKey: number;
  chatroomName: string;
  imagePath: string;
  lastChat: string | null;
  loginUserKey: number;
}

export default function ChatListElement({
  chatroomKey,
  chatroomName,
  imagePath,
  lastChat,
  loginUserKey,
}: IProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const elementOnClick = useCallback(async () => {
    dispatch(getChatParticipants(chatroomKey));
    const encrypted = encryptor.encrypt(
      {
        chatroomKey,
        chatroomName,
      }
    );
    navigate(`/chat/${encrypted}`);
  }, [dispatch, navigate, chatroomKey, chatroomName]);

  const profileOnClick = useCallback(async () => {
    dispatch(getChatParticipants(chatroomKey)).then((participantsUsers) => {
      const users = participantsUsers.payload as User[];
      const anotherUser = users.find(user => user.key !== loginUserKey);
      if(anotherUser) {
        dispatch(getUser(anotherUser.key)).then(() => {
          navigate(paths.profile);
        });
      }
    });
  }, [dispatch, chatroomKey, chatroomName]);

  return (
    <article className={"w-full h-20 flex flex-row items-center border-b-2 border-b-gray-300"}>
      <button
        className={"min-w-fit min-h-fit"}
        onClick={profileOnClick}
      >
        <img
          className={"w-16 h-16 m-2 bg-blue-100 rounded-full"}
          alt={"프로필 사진"}
          src={imagePath}
        />
      </button>
      <article
        role={"presentation"}
        className={"flex-1 flex flex-col h-full pl-2 w-0"}
        onClick={elementOnClick}
      >
        <article className={"basis-1/4 pt-2 font-bold text-lg"}>{chatroomName}</article>
        <article className={"basis-3/4 items-center text-gray-600 truncate"}>{lastChat ?? "대화를 시작해보세요!!"}</article>
      </article>
    </article>
  );
}
