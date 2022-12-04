import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { User } from "../types";
import { ProfileOnClick } from "../util/profileOnClick";


export interface IProps {
  content: string;
  sender: User;
}

const basicChatClassName = "p-2 m-1 border w-auto max-w-2/3 rounded-xl";
const myChatClassname = "bg-pink-300 self-end border-white text-white";
const othersChatClassName = "bg-gray-400 self-start text-white border-gray-400";

export default function ChatBox({
  content,
  sender,
}: IProps) {
  const loginUser = useSelector(selectUser).loginUser;

  return (
    loginUser && (loginUser.key === sender.key) ?
      (
        <article className={`${basicChatClassName} ${myChatClassname}`}>
          {content}
        </article>
      ) :
      (
        <article className={"flex p-2 w-full"}>
          <button
            className={"flex flex-col"}
            onClick={ProfileOnClick(sender.key)}
          >
            <img
              className={"w-10 h-10 m-2 bg-blue-100 rounded-full justify-self-top"}
              alt={""}
              src={sender.photos[0]}
            />
          </button>
          <article className={`${basicChatClassName} ${othersChatClassName}`}>
            {content}
          </article>
        </article>
      )
  );
}
