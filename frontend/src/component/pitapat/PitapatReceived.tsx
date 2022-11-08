import React from "react";
import { useSelector } from "react-redux";
import { selectPhoto } from "../../store/slices/photo";
import { selectUser } from "../../store/slices/user";
import { getKoreanAge, Pitapat } from "../../types";
import { getPitapatStatus } from "../../util/getPitapatStatus";
import Profile from "../Profile";


interface IProps {
  pitapats: Pitapat[],
}

export default function PitapatReceived({
  pitapats,
}: IProps) {
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const loginUser = useSelector(selectUser).loginUser;

  return (
    <section>
      {
        pitapats.map((pitapat) => {
          const from = users.find(user => user.key === pitapat.from)!;
          const photo = photos.find((p) => p.key === from.photos[0]);
          return (
            <Profile
              key={from.key}
              myKey={loginUser?.key ?? -1}
              userKey={from.key}
              username={from.username}
              koreanAge={getKoreanAge(from.birthday)}
              photo={photo ? photo.path : ""}
              showRejectButton={true}
              status={getPitapatStatus(loginUser?.key ?? -1, from.key, pitapats)}
            />
          );
        })
      }
    </section>
  );
}