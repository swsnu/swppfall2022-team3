import * as React from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { selectPhoto } from "../../store/slices/photo";
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
  const photos = useSelector(selectPhoto).photos;
  const loginUser = useSelector(selectUser).loginUser;

  const getSentStatusProfiles = useCallback(() => {
    return pitapats.map((pitapat, index) => {
      const to = users.find(user => user.key === pitapat.to);
      if (to) {
        const photo = photos.find((p) => p.key === to.photos[0]);
        return (
          <Profile
            key={index}
            myKey={loginUser?.key ?? -1}
            userKey={to.key}
            username={to.username}
            koreanAge={getKoreanAge(to.birthday)}
            photo={photo ? photo.path : ""}
            showRejectButton={false}
            isLastElement={(index === pitapats.length - 1) ? true : false}
            status={getPitapatStatus(loginUser?.key ?? -1, to.key, pitapats)}
          />
        );
      } else {
        return <article key={index}></article>;
      }
    });
  }, [loginUser, users, photos, pitapats]);

  return (
    <section>
      {getSentStatusProfiles()}
    </section>
  );
}
