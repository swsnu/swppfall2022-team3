import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/user";
import Profile from "../Profile";


export default function PitapatReceived() {
  const users = useSelector(selectUser).pitapatSenders;

  return (
    <section>
      {
        users.map((user, index) => (
          <Profile
            key={user.key}
            user={user}
            showRejectButton={true}
            isLastElement={index === users.length - 1}
          />
        ))
      }
    </section>
  );
}
