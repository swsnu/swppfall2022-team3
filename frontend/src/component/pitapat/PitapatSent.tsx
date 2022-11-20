import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user";
import Profile from "../Profile";


export default function PitapatSent() {
  const users = useSelector(selectUser).pitapatReceivers;

  return (
    <section>
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
    </section>
  );
}
