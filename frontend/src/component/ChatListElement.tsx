import React from "react";
import { AES } from 'crypto-ts';
import { User } from "../types";
import { useSelector } from "react-redux";
import { selectPhoto } from "../store/slices/photo";
import { useNavigate } from "react-router-dom";


interface IProps {
  user: User,
  lastChat: string | null,
}


export default function ChatListElement({
  user,
  lastChat,
}: IProps) {
  const navigate = useNavigate();
  const userPhotos =
    useSelector(selectPhoto).photos
      .filter((photo) => user.photos.indexOf(photo.key) !== -1)
      .sort((a, b) => a.index - b.index);
  const photoPath = userPhotos[0].path;

  return(
    <article
      className={"w-full h-20 flex flex-row items-center border-b-2 border-b-gray-300"}
      onClick={() => {
        const encrypted = encodeURIComponent(AES.encrypt(JSON.stringify({ from: 1, to: user.key }), 'test', ).toString());
        navigate(`/chat/${encrypted}`);
      }}
    >
      <img
        className={"w-16 h-16 m-2 bg-blue-100 rounded-full"}
        alt={''}
        src={photoPath}
      />
      <div className={"flex-1 flex flex-col h-full pl-2"}>
        <article className={"basis-1/4 pt-2 font-bold text-lg"}>{user.username}</article>
          <article className={`basis-3/4 items-center text-gray-600`}>{lastChat ?? "대화를 시작해보세요!!"}</article>
      </div>
    </article>
  )
}
