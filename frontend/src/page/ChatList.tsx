import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Navigate } from "react-router-dom";
import AppBar from "../component/AppBar";
import ChatListElement from "../component/ChatListElement";
import NavigationBar from "../component/NavigationBar";
import paths from "../constant/path";
import style from "../constant/style";
import { AppDispatch } from "../store";
import { getChatrooms, selectChat } from "../store/slices/chat";
import { selectUser } from "../store/slices/user";
import { savePageYPosition, scrollToPrevPosition } from "../util/pageScroll";


export default function ChatList() {
  const loginUser = useSelector(selectUser).loginUser;
  const chatrooms = useSelector(selectChat).chatrooms;
  const dispatch = useDispatch<AppDispatch>();
  const urlPath = useLocation().pathname;
  const pageBody = useRef<HTMLDivElement>(null);

  const saveYPosition = useCallback(() => {
    savePageYPosition(pageBody, urlPath);
  }, [pageBody, urlPath]);

  useEffect(() => {
    scrollToPrevPosition(pageBody, urlPath);
  }, [pageBody, urlPath]);

  useEffect(() => {
    if (loginUser) {
      dispatch(getChatrooms(loginUser.key));
    }
  }, [loginUser, dispatch]);

  return (
    loginUser ?
      <section className={`${style.page.base} ${style.page.margin.top} ${style.page.margin.bottom}`}>
        <AppBar saveYPosition={saveYPosition}/>
        <section
          className={`${style.page.body} w-full justify-center items-center text-gray-600`}
          role={"presentation"}
          ref={pageBody}
          onClick={saveYPosition}
        >
          {
            chatrooms.map(({ key, name, imagePath, chats }) => (
              <ChatListElement
                key={key}
                chatroomKey={key}
                chatroomName={name}
                imagePath={imagePath}
                lastChat={chats.length === 0 ? null : chats[chats.length - 1].content}
              />
            ))
          }
          {
            chatrooms.length === 0 ?
              "매칭된 사람이 없어요" :
              null
          }
        </section>
        <NavigationBar saveYPosition={saveYPosition}/>
      </section> :
      <Navigate replace to={paths.signIn}/>
  );
}
