import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import NavigationBar from "../component/NavigationBar";
import paths from "../constant/path";
import style from "../constant/style";
import { selectChat } from "../store/slices/chat";
import { selectUser } from "../store/slices/user";
import { User } from "../types";


type ChatRoomInfo = {
  user: User;
  lastChat: string | null;
}

export default function ChatList() {
  const loginUser = useSelector(selectUser).loginUser;
  const users = useSelector(selectUser).users;
  const chats = useSelector(selectChat).chats;
  const navigate = useNavigate();
  const [chatRoomInfos, setChatRoomInfos] = useState<ChatRoomInfo[]>([]);

  useEffect(() => {
    if (loginUser) {
      const sentPitapatKeys: number[] = [];
      const receivedPitapatKeys: number[] = [];
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
  }, [loginUser, users, chats, navigate]);

  return (
    <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
      <AppBar/>
      <section className={style.page.body}>{
        loginUser ?
          chatRoomInfos.map(({ user, lastChat }) => (
            <ChatListElement
              myUser={loginUser}
              otherUser={user}
              lastChat={lastChat}
              key={user.key}
            />
          )) :
          null
      }</section>
      <NavigationBar/>
    </section>
  );
}
