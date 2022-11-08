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

export default function PitapatSent({
  pitapats,
}: IProps) {
  const users = useSelector(selectUser).users;
  const photos = useSelector(selectPhoto).photos;
  const loginUser = useSelector(selectUser).loginUser;

  return (
    <section>
      {
        pitapats.map((pitapat) => {
          const to = users.find(user => user.key === pitapat.to)!;
          const photo = photos.find((p) => p.key === to.photos[0]);
          return (
            <Profile
              key={to.key}
              myKey={loginUser?.key ?? -1}
              userKey={to.key}
              username={to.username}
              koreanAge={getKoreanAge(to.birthday)}
              photo={photo ? photo.path : ""}
              showRejectButton={false}
              status={getPitapatStatus(loginUser?.key ?? -1, to.key, pitapats)}
            />
          );
        })
      }
    </section>
  );
}
