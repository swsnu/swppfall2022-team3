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

export default function PitapatSent({
  pitapats,
}: IProps) {
  const users = useSelector(selectUser).users;
  const loginUser = useSelector(selectUser).loginUser;

  const getSentStatusProfiles = useCallback(() => {
    return pitapats.map((pitapat, index) => {
      const to = users.find(user => user.key === pitapat.to);
      if (to) {
        return (
          <Profile
            key={index}
            user={to}
            nickname={to.nickname}
            koreanAge={getKoreanAge(to.birthday)}
            showRejectButton={false}
            isLastElement={(index === pitapats.length - 1)}
            status={getPitapatStatus(loginUser?.key ?? -1, to.key, pitapats)}
          />
        );
      } else {
        return null;
      }
    });
  }, [loginUser, users, pitapats]);

  return (
    <section>
      {getSentStatusProfiles()}
    </section>
  );
}
