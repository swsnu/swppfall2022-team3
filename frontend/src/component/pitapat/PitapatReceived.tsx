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

export default function PitapatReceived({
  pitapats,
}: IProps) {
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const loginUser = useSelector(selectUser).loginUser;

  const getReceivedStatusProfiles = useCallback(() => {
    return pitapats.map((pitapat, index) => {
      const from = users.find(user => user.key === pitapat.from);
      if (from) {
        const photo = photos.find((p) => p.key === from.photos[0]);
        return (
          <Profile
            key={index}
            myKey={loginUser?.key ?? -1}
            userKey={from.key}
            username={from.username}
            koreanAge={getKoreanAge(from.birthday)}
            photo={photo ? photo.path : ""}
            showRejectButton={true}
            isLastElement={(index === pitapats.length - 1) ? true : false}
            status={getPitapatStatus(loginUser?.key ?? -1, from.key, pitapats)}
          />
        );
      } else {
        return <article key={index}></article>;
      }
    });
  }, [loginUser, users, photos, pitapats]);

  return (
    <section>
      {getReceivedStatusProfiles()}
    </section>
  );
}
