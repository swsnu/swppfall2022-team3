import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import { Chat } from "../types";
import { AES, enc } from "crypto-ts";
import { useDispatch, useSelector } from "react-redux";
import { chatAction, selectChat } from "../store/slices/chat";
import { AppDispatch } from "../store";
import ChatBox from "../component/ChatBox";
import { selectUser } from "../store/slices/user";
import path from "../constant/path";


export default function ChatDetail() {
  const loginUser = useSelector(selectUser).loginUser;
  const params = useParams();
  const navigate = useNavigate();
  const chats = useSelector(selectChat).chats;
  const users = useSelector(selectUser).users;
  const dispatch = useDispatch<AppDispatch>();
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  const [appBarTitle, setAppBarTitle] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [myChats, setMyChats] = useState<Chat[]>([]);

  const sendChat = useCallback(() => {
    dispatch(chatAction.add(
      {
        from,
        to,
        key: chats.map((c) => c.key).reduce((acc, k) => acc < k ? k : acc, 0) + 1,
        regDt: new Date(),
        content: chatInput,
      }
    ));
    setChatInput("");
  }, [dispatch, chatInput, from, to, chats]);

  useEffect(() => {
    if (loginUser) {
      const encrypted = params.encrypted ?? null;
      if (encrypted === null) {
        navigate(path.chat);
      }
      else {
        try {
          const decrypted: { from: number, to: number } = JSON.parse(AES.decrypt(encrypted, "test").toString(enc.Utf8));
          if (decrypted?.from && decrypted?.to) {
            if (decrypted.from !== loginUser.key) {
              navigate(path.chat);
            }
            else {
              setFrom(decrypted.from);
              setTo(decrypted.to);
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
          } else {
            navigate(path.chat);
          }
        } catch (_) {
          navigate(path.chat);
        }
      }
    }
    else {
      navigate(path.signIn);
    }
  }, [params, navigate, chats, users, loginUser, to]);

  return (
    <section className={"flex-1 flex flex-col mt-12 mb-16"}>
      <AppBar title={appBarTitle}/>
      <section className={"flex-1 flex flex-col w-full h-full"}>{
        myChats.map((chat) => <ChatBox key={chat.content + chat.regDt.getTime()} content={chat.content} isMine={chat.from === from}/>)
      }</section>
      <article className={"w-full flex flex-row bg-gray-300 p-2 gap-2 items-center fixed bottom-0"}>
        <input
          className={"rounded bg-white h-8 my-1 flex-1"}
          type={"text"}
          value={chatInput}
          onChange={(e) => {
            setChatInput(e.target.value);
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
