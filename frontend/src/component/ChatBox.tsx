import * as React from "react";
import { useNavigate } from "react-router-dom";


interface IProps {
  content: string,
  isMine: boolean,
  sender: number,
  photoPath: string,
}

const myChatClassname = "bg-pink-300 text-white";
const othersChatClassName = "bg-gray-400 text-white";

export default function ChatBox({
  content,
  sender,
  isMine,
  photoPath,
}: IProps) {
  const navigate = useNavigate();

  return (
    <article className={`flex flex-auto p-2 ${isMine ? "self-end" : "self-start"}`}>
      {!isMine ?
        <button onClick={() => navigate("/profile/" + sender)}>
          <img
            className={"w-10 h-10 m-2 bg-blue-100 rounded-full"}
            alt={""}
            src={photoPath}
          />
        </button>
        :
        null
      }
      <article className={`p-2 rounded-xl w-auto border ${isMine ? myChatClassname : othersChatClassName}`}>
        {content}
      </article>
    </article>
  );
}
