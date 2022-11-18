import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectPhoto } from "../store/slices/photo";
import { User } from "../types";
import encryptor from "../util/encryptor";


interface IProps {
  myUser: User;
  otherUser: User;
  lastChat: string | null;
}

export default function ChatListElement({
  myUser,
  otherUser,
  lastChat,
}: IProps) {
  const navigate = useNavigate();
  const userPhotos =
    useSelector(selectPhoto).photos
      .filter((photo) => otherUser.photos.indexOf(photo.key) !== -1)
      .sort((a, b) => a.index - b.index);
  const photoPath = userPhotos[0].path;

  const elementOnClick = useCallback(() => {
    const encrypted = encryptor.encrypt(
      {
        from: myUser.key,
        to: otherUser.key,
        photoPath: photoPath,
      }
    );
    navigate(`/chat/${encrypted}`);
  }, [myUser, otherUser, navigate, photoPath]);

  return (
    <article className={"w-full h-20 flex flex-row items-center border-b-2 border-b-gray-300"}>
      <button
        className={"min-w-fit min-h-fit"}
        onClick={() => navigate("/profile/" + otherUser.key)}
      >
        <img
          className={"w-16 h-16 m-2 bg-blue-100 rounded-full"}
          alt={""}
          src={photoPath}
        />
      </button>
      <article
        role={"presentation"}
        className={"flex-1 flex flex-col h-full pl-2 w-0"}
        onClick={elementOnClick}
      >
        <article className={"basis-1/4 pt-2 font-bold text-lg"}>{otherUser.nickname}</article>
        <article className={"basis-3/4 items-center text-gray-600 truncate"}>{lastChat ?? "대화를 시작해보세요!!"}</article>
      </article>
    </article>
  );
}
