import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AES } from "crypto-ts";
import { selectPhoto } from "../store/slices/photo";
import { selectUser } from "../store/slices/user";
import { User } from "../types";


interface IProps {
  user: User,
  lastChat: string | null,
}

export default function ChatListElement({
  user,
  lastChat,
}: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const navigate = useNavigate();
  const userPhotos =
    useSelector(selectPhoto).photos
      .filter((photo) => user.photos.indexOf(photo.key) !== -1)
      .sort((a, b) => a.index - b.index);
  const photoPath = userPhotos[0].path;

  const elementOnClick = useCallback(() => {
    if (loginUser) {
      const jsonString = JSON.stringify({ from: loginUser.key, to: user.key });
      const encrypted = encodeURIComponent(AES.encrypt(jsonString, "test",).toString());
      navigate(`/chat/${encrypted}`);
    }
  }, [user, loginUser, navigate]);

  return (
    <article
      role={"presentation"}
      className={"w-full h-20 flex flex-row items-center border-b-2 border-b-gray-300"}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          elementOnClick();
        }
      }}
    >
      <button onClick={() => navigate("/profile/" + user.key)}>
        <img
          className={"w-16 h-16 m-2 bg-blue-100 rounded-full"}
          alt={""}
          src={photoPath}
        />
      </button>
      <button
        className={"flex-1 flex flex-col h-full pl-2"}
        onClick={elementOnClick}>
        <article className={"basis-1/4 pt-2 font-bold text-lg"}>{user.username}</article>
        <article className={"basis-3/4 items-center text-gray-600"}>{lastChat ?? "대화를 시작해보세요!!"}</article>
      </button>
    </article>
  );
}
