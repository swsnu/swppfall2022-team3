import React, { useEffect, useState } from "react";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/user";
import { Page, User } from "../types";


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
    <section className={"h-screen flex flex-col"}>
      <AppBar page={Page.CHAT_LIST} title={""} clickBack={() => {}}/>
      <section className={"flex-1 flex flex-col"}>{
         chatRoomInfos.map(({ user, lastChat }) => (
           <ChatListElement
             user={user}
             lastChat={lastChat}
             key={user.key}
           />
         ))
      }</section>
    </section>
  );
}
