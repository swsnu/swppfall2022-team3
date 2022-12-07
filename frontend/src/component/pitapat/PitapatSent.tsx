import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user";
import Profile from "../Profile";


export default function PitapatSent() {
  const users = useSelector(selectUser).pitapat.receivers;

  return (
    <section
      className={
        users.length === 0 ?
          "h-full flex flex-col items-center justify-center text-gray-600" :
          ""
      }
    >
      {
        users.map((user, index) => (
          <Profile
            key={user.key}
            user={user}
            showRejectButton={false}
            isLastElement={index === users.length - 1}
          />
        ))
      }
      {
        users.length === 0 ?
          "아직 보낸 두근이 없어요" :
          null
      }
    </section>
  );
}
