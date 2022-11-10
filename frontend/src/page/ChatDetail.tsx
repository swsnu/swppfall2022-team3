import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatBox from "../component/ChatBox";
import paths from "../constant/path";
import { AppDispatch } from "../store";
import { chatAction, selectChat } from "../store/slices/chat";
import { selectUser } from "../store/slices/user";
import { Chat } from "../types";
import urlParamEncryptor from "../util/urlParamEncryptor";


interface IDecrypted {
  from: number;
  to: number;
  photoPath: string;
}

export default function ChatDetail() {
  const loginUser = useSelector(selectUser).loginUser;
  const params = useParams();
  const navigate = useNavigate();
  const chats = useSelector(selectChat).chats;
  const users = useSelector(selectUser).users;
  const dispatch = useDispatch<AppDispatch>();
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);
  const [otherUserPhotoPath, setOtherUserPhotoPath] = useState<string>("");

  const [appBarTitle, setAppBarTitle] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [myChats, setMyChats] = useState<Chat[]>([]);

  const sendChat = useCallback(() => {
    if (chatInput !== "") {
      dispatch(chatAction.add(
        {
          from,
          to,
          key: Math.max(...chats.map((c) => c.key)) + 1,
          regDt: new Date(),
          content: chatInput,
        }
      ));
      setChatInput("");
    }
  }, [dispatch, chatInput, from, to, chats]);

  useEffect(() => {
    if (loginUser) {
      const encrypted = params.encrypted ?? null;
      if (encrypted === null) {
        navigate(paths.chat);
      }
      else {
        try {
          const decrypted = urlParamEncryptor.decrypt<IDecrypted>(encrypted);
          if ((decrypted?.from) && (decrypted?.to) && (decrypted?.photoPath)) {
            if (decrypted.from !== loginUser.key) {
              navigate(paths.chat);
            }
            else {
              setFrom(decrypted.from);
              setTo(decrypted.to);
              setOtherUserPhotoPath(decrypted.photoPath);
              setMyChats(
                chats.filter(
                  (c) =>
                    ((c.from === decrypted.from) && (c.to === decrypted.to)) ||
                    ((c.from === decrypted.to) && (c.to === decrypted.from))
                )
              );

              const userTo = users.find((u) => u.key === to);
              setAppBarTitle(userTo?.username ?? "");
            }
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
  }, [params, navigate, chats, users, loginUser, to]);

  return (
    <section className={"flex-1 flex flex-col mt-12 mb-16"}>
      <AppBar title={appBarTitle}/>
      <section className={"flex-1 flex flex-col overflow-scroll"}>{
        myChats.map((chat) => (
          <ChatBox
            key={chat.content + chat.regDt.getTime()}
            content={chat.content}
            sender={chat.from}
            isMine={chat.from === from}
            photoPath={otherUserPhotoPath}
          />
        ))
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
