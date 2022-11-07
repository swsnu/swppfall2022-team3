import React from "react";
import { useNavigate } from "react-router";
import { PitapatStatus } from "../types";
import PitapatButton from "./PitapatButton";


interface IProps {
  myKey: number;
  userKey: number;
  username: string;
  koreanAge: number;
  photo: string;
  status: PitapatStatus;
}

export default function Profile({
  myKey,
  userKey,
  username,
  koreanAge,
  photo,
  status,
}: IProps) {
  const navigate = useNavigate();

  return (
    <div className={"relative h-[100vw]"}>
      <button onClick={() => navigate("/profile/" + userKey)} className={"w-full z-0"}>
        <img
          src={photo}
          alt={photo}
          className={"object-cover w-full h-[100vw]"}
        />
      </button>
      <div
        className={"absolute h-14 bottom-0 left-0 right-0 px-4 py-2 flex flex-col justify-center"}
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, #000000 100%)",
        }}
      >
        <div className={"flex flex-row"}>
          <div className={"flex-none w-16"}>
          </div>
          <div className={"flex-auto truncate flex flex-col justify-center text-center text-white text-lg font-bold"}>
            <div className={"flex-none mx-2 truncate"}>{username}/{koreanAge}</div>
          </div>
          <div className={"flex-none w-16 flex flex-col justify-center"}>
            <PitapatButton
              from={myKey}
              to={userKey}
              status={status}
              isListView={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
