import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatBox from "../component/ChatBox";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { selectChat } from "../store/slices/chat";
import { selectUser } from "../store/slices/user";
import encryptor from "../util/encryptor";


interface IDecrypted {
  chatroomKey: number;
  chatroomName: string;
}

export default function ChatDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const loginUser = useSelector(selectUser).loginUser;
  const participants = useSelector(selectUser).chat.participants;
  const chats = useSelector(selectChat).chats;
  const dispatch = useDispatch<AppDispatch>();

  const [appBarTitle, setAppBarTitle] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");

  const sendChat = useCallback(() => {
    if (chatInput !== "") {
      setChatInput("");
    }
  }, [dispatch, chatInput]);

  useEffect(() => {
    if (loginUser) {
      const encrypted = params.encrypted ?? null;
      if (encrypted === null) {
        navigate(paths.chat);
      }
      else {
        try {
          const decrypted = encryptor.decrypt<IDecrypted>(encrypted);
          if ((decrypted?.chatroomKey) && (decrypted?.chatroomName)) {
            setAppBarTitle(decrypted.chatroomName);
          }
          else {
            navigate(paths.chat);
          }
        } catch (_) {
          navigate(paths.chat);
        }
      }
    }
    else {
      navigate(paths.signIn);
    }
  }, [params, navigate, chats, loginUser]);

  return (
    <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
      <AppBar title={appBarTitle}/>
      <section className={style.page.body}>{
        chats.map((chat) => {
          const participant = participants.find((u) => u.key === chat.from);
          return participant ?
            (<ChatBox
              key={chat.key}
              content={chat.content}
              sender={participant}
            />) :
            null;
        })
      }</section>
      <article className={"w-full flex flex-row bg-gray-300 p-2 gap-2 items-center fixed bottom-0"}>
        <input
          className={"rounded bg-white h-8 my-1 flex-1"}
          type={"text"}
          value={chatInput}
          onChange={(e) => {
            setChatInput(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              sendChat();
            }
          }}
          placeholder={"메세지를 입력하세요"}
        />
        <section>
          <button
            className={"w-20 h-8 my-2 bg-pink-300 rounded text-white font-bold select-none"}
            onClick={sendChat}
          >
            전송
          </button>
        </section>
      </article>
    </section>
  );
}
