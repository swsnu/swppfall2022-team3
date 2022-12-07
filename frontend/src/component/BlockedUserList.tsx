import React, { Dispatch, SetStateAction, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import style from "../constant/style";
import { selectUser } from "../store/slices/user";
import BlockedUserElement from "./BlockedUserElement";


interface IProps {
  setBlockedEdit: Dispatch<SetStateAction<boolean>>;
}

export default function BlockedUserList({ setBlockedEdit }: IProps) {
  const loginUser = useSelector(selectUser).loginUser;
  const blockedUsers = useSelector(selectUser).blocked;
  const pageBody = useRef<HTMLDivElement>(null);
  const title = "두근두근 캠퍼스";
  const iconClassName = "h-8 w-8 mx-2";

  const cancelOnClickHandler = useCallback( () => {
    setBlockedEdit(false);
  },
  [setBlockedEdit]);

  return (
    <section className={`${style.page.base} ${style.page.margin.top}`}>
      <section className={"w-full z-20 flex justify-center p-2 fixed top-0 bg-white border-b-2 border-b-pink-300 z-10"}>
        <ArrowUturnLeftIcon
          className={iconClassName}
          onClick={cancelOnClickHandler}
        />
        <section className={"flex-auto flex justify-center"}>
          <div
            className={"flex-none text-center m-auto text-lg font-bold text-pink-500"}>{title}</div>
        </section>
        <div className={iconClassName} />
      </section>
      <section
        className={style.page.body}
        role={"presentation"}
        ref={pageBody}
      >
        {
          blockedUsers.map(({ key, nickname, photos }) => (
            <BlockedUserElement
              key={key}
              fromUserKey={loginUser?.key ?? 0}
              toUserKey={key}
              userName={nickname}
              imagePath={photos[0]}
            />
          ))
        }</section>
    </section>
  );
}
