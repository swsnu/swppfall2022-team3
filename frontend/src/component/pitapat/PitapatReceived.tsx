import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user";
import { Pitapat } from "../../types";
import { getKoreanAge } from "../../util/getKoreanAge";
import { getPitapatStatus } from "../../util/getPitapatStatus";
import Profile from "../Profile";


interface IProps {
  pitapats: Pitapat[];
}

export default function PitapatReceived({
  pitapats,
}: IProps) {
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;

  const getReceivedStatusProfiles = useCallback(() => {
    return pitapats
      .filter((pitapat) => users.find(user => user.key === pitapat.from))
      .map((pitapat, index) => (
        <Profile
          key={index}
          user={users.find(user => user.key === pitapat.from)!}
          nickname={users.find(user => user.key === pitapat.from)!.nickname}
          koreanAge={getKoreanAge(users.find(user => user.key === pitapat.from)!.birthday)}
          showRejectButton={true}
          isLastElement={(index === pitapats.length - 1)}
          status={getPitapatStatus(loginUser?.key ?? -1, users.find(user => user.key === pitapat.from)!.key, pitapats)}
        />
      ));
  }, [loginUser, users, pitapats]);

  return (
    <section>
      {getReceivedStatusProfiles()}
    </section>
  );
}
