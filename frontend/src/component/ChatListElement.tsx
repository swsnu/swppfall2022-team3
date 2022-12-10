import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { getChatParticipants } from "../store/slices/user";
import encryptor from "../util/encryptor";


interface IProps {
  chatroomKey: number;
  chatroomName: string;
  imagePath: string;
  lastChat: string | null;
}

export default function ChatListElement({
  chatroomKey,
  chatroomName,
  imagePath,
  lastChat,
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

  return (
    <article
      className={"w-full h-20 flex flex-row items-center border-b-2 border-b-gray-300"}
      role={"presentation"}
      onClick={elementOnClick}
    >
      <img
        className={"w-16 h-16 m-2 bg-blue-100 rounded-full"}
        alt={"프로필 사진"}
        src={imagePath}
      />
      <article
        className={"flex-1 flex flex-col h-full pl-2 w-0"}
      >
        <article className={"basis-1/4 pt-2 font-bold text-lg"}>{chatroomName}</article>
        <article className={"basis-3/4 items-center text-gray-600 truncate"}>{lastChat ?? "대화를 시작해보세요!!"}</article>
      </article>
    </article>
  );
}
