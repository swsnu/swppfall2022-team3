import React, { useEffect, useState } from "react";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { User } from "../types";
import NavigationBar from "../component/NavigationBar";
import { selectPitapat } from "../store/slices/pitapat";
import { selectChat } from "../store/slices/chat";


type ChatRoomInfo = {
  user: User,
  lastChat: string | null,
}

export default function ChatList() {
  const myKey = 1;
  const users = useSelector(selectUser).users;
  const pitapats = useSelector(selectPitapat).pitapats;
  const chats = useSelector(selectChat).chats;
  const [chatRoomInfos, setChatRoomInfos] = useState<ChatRoomInfo[]>([])

  useEffect(() => {
    const sentPitapatKeys =
      pitapats
        .filter((p) => p.from === myKey)
        .map((p) => p.to);
    const receivedPitapatKeys =
      pitapats
        .filter((p) => p.to === myKey)
        .map((p) => p.from);
    const myChats =
      chats
        .filter((c) => (c.to === myKey) || (c.from == myKey))
        .sort((a, b) => a.regDt.getTime() - b.regDt.getTime())
        .reverse();

    setChatRoomInfos(
      users
        .filter((user) => (sentPitapatKeys.indexOf(user.key) !== -1) && (receivedPitapatKeys.indexOf(user.key) !== -1))
        .map((user) => ({
          user,
          lastChat: myChats.find((c) => (c.to === user.key) || (c.from === user.key))?.content ?? null,
        }))
    )
  }, [users])

  return (
    <section className={"w-full flex-1 flex flex-col mt-12 mb-16"}>
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
