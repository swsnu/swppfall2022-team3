import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import NavigationBar from "../component/NavigationBar";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getChatrooms, selectChat } from "../store/slices/chat";
import { selectUser } from "../store/slices/user";


export default function ChatList() {
  const loginUser = useSelector(selectUser).loginUser;
  const chatrooms = useSelector(selectChat).chatrooms;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (loginUser) {
      dispatch(getChatrooms(loginUser.key));
    }
  }, [loginUser, dispatch]);

  return (
    loginUser ?
      <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
        <AppBar/>
        <section className={style.page.body}>{
          chatrooms.map(({ key, name, imagePath, chats }) => (
            <ChatListElement
              key={key}
              chatroomKey={key}
              chatroomName={name}
              imagePath={imagePath}
              lastChat={chats.length === 0 ? null : chats[chats.length - 1].content}
              loginUserKey={loginUser.key}
            />
          ))
        }</section>
        <NavigationBar/>
      </section> :
      <Navigate replace to={paths.signIn}/>
  );
}
