import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { pitapatAction, selectPitapat } from "../store/slices/pitapat";
import { selectUser } from "../store/slices/user";
import { PitapatStatus } from "../types";


interface IProps {
  from: number;
  to: number;
  pitapatStatus: PitapatStatus;
  isAccept: boolean;
  isListView: boolean;
}

export default function PitapatButton({
  from,
  to,
  pitapatStatus,
  isAccept,
  isListView,
}: IProps) {
  const dispatch = useDispatch<AppDispatch>();
  const loginUser = useSelector(selectUser).loginUser;
  const pitapats = useSelector(selectPitapat).pitapats;

  function isPitapatAlreadySended(): boolean {
    if (!loginUser) {
      return false;
    }
    return pitapats.filter((p) => p.from === loginUser.key).filter((p) => p.to === to).length !== 0;
  }

  function getIconText(isAccept: boolean) {
    if (!isAccept) {
      return "X";
    }
    return isPitapatAlreadySended() ? "♥" : "♡";
  }

  function getButtonText(isAccept: boolean, status: PitapatStatus) {
    if (!isAccept) {
      return "거절";
    }
    switch (status) {
    case PitapatStatus.NONE:
      return "두근";
    case PitapatStatus.RECEIVED:
      return "수락";
    case PitapatStatus.SENT:
      return "취소";
    case PitapatStatus.MATCHED:
      return "매칭";
    }
  }

  function onClickPitapatButton(isAccept: boolean) {
    if (isAccept) {
      dispatch(pitapatAction.toggle({ from: from, to: to }));
    }
    else {
      dispatch(pitapatAction.delete({ from: to, to: from }));
    }
  }

  return (
    <button
      className={`${isListView ? "flex-none" : "absolute right-4"} w-16 h-8 z-10 bg-white rounded-lg border ${isAccept ? "border-pink-600" : "border-blue-600"} flex items-center justify-center`}
      onClick={() => onClickPitapatButton(isAccept)}
    >
      <div className={`flex-none mx-0.5 font-bold ${isAccept ? "text-pink-600" : "text-blue-600"}`}>
        {getIconText(isAccept)}
      </div>
      <div className={`flex-none text-sm mx-1.5 font-bold ${isAccept ? "text-pink-600" : "text-blue-600"}`}>
        {getButtonText(isAccept, pitapatStatus)}
      </div>
    </button>
  );
}
