import * as React from "react";
import { useNavigate } from "react-router-dom";


interface IProps {
  content: string;
  isMine: boolean;
  sender: number;
  photoPath: string;
}

const basicChatClassName = "p-2 m-1 border w-auto max-w-2/3 rounded-xl";
const myChatClassname = "bg-pink-300 self-end border-white text-white";
const othersChatClassName = "bg-gray-400 self-start text-white border-gray-400";

export default function ChatBox({
  content,
  sender,
  isMine,
  photoPath,
}: IProps) {
  const navigate = useNavigate();

  return (
    isMine ?
      (
        <article className={`${basicChatClassName} ${myChatClassname}`}>
          {content}
        </article>
      ) :
      (
        <article className={"flex flex-auto p-2 w-full"}>
          <button
            className={"flex flex-col"}
            onClick={() => navigate("/profile/" + sender)}
          >
            <img
              className={"w-10 h-10 m-2 bg-blue-100 rounded-full justify-self-top"}
              alt={""}
              src={photoPath}
            />
          </button>
          <article className={`${basicChatClassName} ${othersChatClassName}`}>
            {content}
          </article>
        </article>
      )
  );
}
