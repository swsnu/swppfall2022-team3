import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectPitapat } from "../store/slices/pitapat";
import { PitapatStatus } from "../types";
import { getPitapatStatus } from "../util/getPitapatStatus";
import PitapatButton from "./PitapatButton";


interface IProps {
  myKey: number;
  userKey: number;
  username: string;
  koreanAge: number;
  photo: string;
  showRejectButton: boolean;
  isLastElement: boolean;
  status: PitapatStatus;
}

export default function Profile({
  myKey,
  userKey,
  username,
  koreanAge,
  photo,
  showRejectButton,
  isLastElement,
  status,
}: IProps) {
  const navigate = useNavigate();
  const pitapats = useSelector(selectPitapat).pitapats;

  return (
    <article className={`relative h-[100vw] ${isLastElement ? "" : "mb-2"}`}>
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
        <div className={"flex flex-row items-center"}>
          <div className={"flex-none w-16"}>
            {getPitapatStatus(myKey, userKey, pitapats) && showRejectButton ? <PitapatButton
              from={myKey}
              to={userKey}
              pitapatStatus={status}
              isAccept={false}
              isListView={true}
            /> : ""}
          </div>
          <div className={"flex-auto truncate flex flex-col text-center text-white text-lg font-bold"}>
            <div className={"flex-none mx-2 truncate"}>{username}/{koreanAge}</div>
          </div>
          <div className={"flex-none w-16"}>
            <PitapatButton
              from={myKey}
              to={userKey}
              pitapatStatus={status}
              isAccept={true}
              isListView={true}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
