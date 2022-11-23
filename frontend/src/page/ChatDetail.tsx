import React, { useCallback, useEffect, useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatBox from "../component/ChatBox";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { selectUser } from "../store/slices/user";
import encryptor from "../util/encryptor";


interface IDecrypted {
  chatroomKey: number;
  chatroomName: string;
}

export default function ChatDetail() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const loginUser = useSelector(selectUser).loginUser;
  const participants = useSelector(selectUser).chat.participants;

  const [appBarTitle, setAppBarTitle] = useState<string>("");
  const [decrypted, setDecrypted] = useState<IDecrypted>();
  const [socket, setSocket] = useState<WebSocket>();
  const [chats, setChats] = useState<{chatroomKey: number; author: number; content: string}[]>([]);
  const [chatInput, setChatInput] = useState<string>("");

  useEffect(() => {
    if (!loginUser) {
      navigate(paths.signIn);
    }
  }, [loginUser, navigate]);

  useEffect(() => {
    const encrypted = params.encrypted ?? "";
    if (encrypted === "") {
      navigate(paths.chat);
    }

    try {
      const decrypted = encryptor.decrypt<IDecrypted>(encrypted);
      if (decrypted.chatroomKey && decrypted.chatroomName) {
        setAppBarTitle(decrypted.chatroomName);
        setDecrypted(decrypted);
      }
      else {
        navigate(paths.chat);
      }
    } catch (_) {
      navigate(paths.chat);
    }
  }, [params, navigate]);

  useEffect(() => {
    if (decrypted) {
      setSocket(new WebSocket(`ws://localhost:8000/ws/chat/${decrypted.chatroomKey}/`));
    }
  }, [decrypted]);

  useEffect(() => {
    if (decrypted) {
      const chatroomKey = decrypted.chatroomKey;
      if (socket && chatroomKey) {
        socket.onmessage = (e) => {
          const data = JSON.parse(e.data);
          if (data.method === "create") {
            setChats([...chats, {
              chatroomKey: chatroomKey,
              author: data.author,
              content: data.content,
            }]);
          } else if (data.method === "load") {
            setChats(data.chats.map((chat: {author: number; content: string}) => {
              return {...chat, chatroomKey: chatroomKey};
            }));
          }
        };
      }
    }
  }, [decrypted, socket, chats, dispatch]);

  const sendChat = useCallback(() => {
    if (chatInput !== "") {
      socket?.send(JSON.stringify({
        method: "create",
        message: chatInput,
      }));
      setChatInput("");
    }
  }, [socket, chatInput]);

  return (
    <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
      <AppBar title={appBarTitle}/>
      <section className={style.page.body}>{
        chats.map((chat, index) => {
          const participant = participants.find((u) => u.key === chat.author);
          return participant ?
            (<ChatBox
              key={index}
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
