import React, { useEffect, useState } from "react";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { User } from "../types";
import NavigationBar from "../component/NavigationBar";


type ChatRoomInfo = {
  user: User,
  lastChat: string | null,
}

export default function ChatList() {
  const users = useSelector(selectUser).users;
  const [chatRoomInfos, setChatRoomInfos] = useState<ChatRoomInfo[]>([])

  useEffect(() => {
    setChatRoomInfos(users.map((user) => ({ user, lastChat: null })))
  }, [users])

  return (
    <section className={"h-screen w-full flex flex-col mt-12 mb-16"}>
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
