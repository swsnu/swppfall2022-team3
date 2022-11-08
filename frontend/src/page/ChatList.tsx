import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import NavigationBar from "../component/NavigationBar";
import paths from "../constant/path";
import { selectChat } from "../store/slices/chat";
import { selectPitapat } from "../store/slices/pitapat";
import { selectUser } from "../store/slices/user";
import { User } from "../types";


type ChatRoomInfo = {
  user: User,
  lastChat: string | null,
}

export default function ChatList() {
  const loginUser = useSelector(selectUser).loginUser;
  const users = useSelector(selectUser).users;
  const pitapats = useSelector(selectPitapat).pitapats;
  const chats = useSelector(selectChat).chats;
  const navigate = useNavigate();
  const [chatRoomInfos, setChatRoomInfos] = useState<ChatRoomInfo[]>([]);

  useEffect(() => {
    if (loginUser) {
      const sentPitapatKeys =
        pitapats
          .filter((p) => p.from === loginUser.key)
          .map((p) => p.to);
      const receivedPitapatKeys =
        pitapats
          .filter((p) => p.to === loginUser.key)
          .map((p) => p.from);
      const myChats =
        chats
          .filter((c) => (c.to === loginUser.key) || (c.from === loginUser.key))
          .sort((a, b) => a.regDt.getTime() - b.regDt.getTime())
          .reverse();

      setChatRoomInfos(
        users
          .filter((user) => user.key !== loginUser.key)
          .filter((user) => (sentPitapatKeys.indexOf(user.key) !== -1) && (receivedPitapatKeys.indexOf(user.key) !== -1))
          .map((user) => ({
            user,
            lastChat: myChats.find((c) => (c.to === user.key) || (c.from === user.key))?.content ?? null,
          }))
      );
    }
    else {
      navigate(paths.signIn);
    }
  }, [loginUser, users, pitapats, chats, navigate]);

  return (
    <section className={"w-full flex-1 flex flex-col mt-12 mb-[56px]"}>
      <AppBar/>
      <section className={"flex-1 flex flex-col"}>{
        chatRoomInfos.map(({ user, lastChat }) => (
          <ChatListElement
            user={user}
            lastChat={lastChat}
            key={user.key}
          />
        ))
      }</section>
      <NavigationBar/>
    </section>
  );
}
